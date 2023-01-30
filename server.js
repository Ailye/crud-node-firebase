const express = require("express");
const { FieldValue } = require("firebase-admin/firestore");
const app = express();
const port = 8383;
const { db } = require("./firebase.js");
const cors = require("cors");

app.use(express.json());
app.use(
  cors({
    origin: "*",
  })
);

app.get("/wines", async (req, res) => {
  const winesRef = db.collection("wines");
  const snapshot = await winesRef.get();
  let formattedData = [];
  snapshot.forEach((doc) => {
    formattedData.push(doc.data());
  });

  res.status(200).send(formattedData);
});

app.get("/wines/:name", async (req, res) => {
  const name = req.params["name"];
  const wineRef = db.collection("wines");
  const snapshot = await wineRef.where("name", "==", name).get();
  let formattedData = [];
  snapshot.forEach((doc) => {
    formattedData.push(doc.data());
  });
  res.status(200).send(formattedData);
});

app.post("/add-wine", async (req, res) => {
  console.log(req.body);
  const wine = req.body;
  const wineRef = db.collection("wines");
  wineRef.add(wine);
  res.status(200).send(wine);
});

app.listen(port, () => console.log(`Server has started on port: ${port}`));
