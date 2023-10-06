const express = require("express");
const app = express();
require("dotenv").config();
const admin = require("firebase-admin");
const credentials = require("./firebaseServiceKey.json");

admin.initializeApp({
  credential: admin.credential.cert(credentials),
  databaseURL: "https://node-test-project-3d4c5.firebaseio.com", // Firebase database URL
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const db = admin.firestore();
console.log("Firestore connected successfully");

// Middleware auth------
function CheckAuth(req, res, next) {
  const { token } = req.headers;
  console.log(" token", token);
  if (token == null || token == undefined || !token) {
    return res.status(404).send({
      message: " Auth token is required, Please provide token to proceed",
    });
  }
  if (token == process.env.auth_key) {
    next(); //Token is valid, proceed to the CRUD APIs
  } else {
    return res.status(401).send({
      message: "Unauthorized",
    });
  }
}

// Create Data....
app.post("/create", CheckAuth, async (req, res) => {
  try {
    const id = req.body.email;
    const userJson = {
      email: req.body.email,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
    };
    // If we want to get data with unique id which firestore will provide than --
    // await db.collection("users").add(id).set(userJson);

    // Create document which will have a unique email (using set)
    const response = await db.collection("users").doc(id).set(userJson);
    res.status(200).send({
      message: "User document created successfully",
      result: response,
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("Error creating user document");
  }
});

// Read all
app.get("/read/all", CheckAuth, async (req, res) => {
  try {
    const userRef = db.collection("users");
    const response = await userRef.get();
    //all entries will be in array
    const responseArray = [];
    response.forEach((doc) => {
      responseArray.push(doc.data());
    });
    res.status(200).send({
      message: "data fetched successfully",
      result: responseArray,
    });
  } catch (error) {
    console.log("error", error);
    res.status(500).send("error while fetching Data" + error);
  }
});

// Read specific data with email or Id
app.get("/read/:id", CheckAuth, async (req, res) => {
  try {
    const userRef = db.collection("users").doc(req.params.id);
    const response = await userRef.get();

    res.status(200).send({
      message: "user's details fetched successfully",
      result: response.data(),
    });
  } catch (error) {
    console.log("error", error);
    res.status(500).send("error while fetching Data" + error);
  }
});

//Update
app.post("/update/:id", CheckAuth, async (req, res) => {
  try {
    const email = req.body.email;
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;

    const userRef = await db.collection("users").doc(req.params.id).update({
      firstName: firstName,
      lastName: lastName,
      email: email,
    });

    res.status(200).send({
      message: "User details got updated successfully",
      result: userRef,
    });
  } catch (error) {
    console.log("error", error);
    res.status(500).send("error while fetching Data" + error);
  }
});

// Delete
app.delete("/delete/:id", CheckAuth, async (req, res) => {
  try {
    const userRef = await db.collection("users").doc(req.params.id).delete();
    res.status(200).send({
      message: "User's details deleted successfully",
      result: userRef,
    });
  } catch (error) {
    console.log("error", error);
    res
      .status(500)
      .send({ message: "error while fetching Data", error: error });
  }
});

module.exports = CheckAuth;
module.exports = app;
