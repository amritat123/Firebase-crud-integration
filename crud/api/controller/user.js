const db = require("../config/firebase-db");

// Create New User---
exports.createUser = async (req, res) => {
  try {
    const id = req.body.email;
    const userJsonData = {
      email: req.body.email,
      contact: req.body.contact,
      age: req.body.age,
      full_name: req.body.full_name,
      address: req.body.address,
    };
    // If we want to get data with unique id which firestore will provide than --
    // await db.collection("users").add(id).set(userJson);

    // create  user's collection with unique email
    const response = await db.collection("users").doc(id).set(userJsonData);
    res.status(200).send({
      message: "New User is created successfully",
      result: response,
    });
  } catch (error) {
    console.log("error orroured", error);
    res.status(500).send({
      message: "something went wrong",
      error: error,
    });
  }
};

// Read All users list
exports.readAllUsers = async (req, res) => {
  try {
    const userData = await db.collection("users").get();
    const userDataArray = [];
    userData.forEach((doc) => {
      userDataArray.push(doc.data());
    });
    res.status(200).send({
      message: "User list retrieved successfully",
      result: userDataArray,
    });
  } catch (error) {
    console.log("error :-", error);
    res.status(500).send({
      message: "something went wrong",
      error: error,
    });
  }
};

// Read by user's ID
exports.readUserDetail = async (req, res) => {
  try {
    const userDetail = db.collection("users").doc(req.params.id);
    const data = await userDetail.get();
    res.status(200).send({
      message: "User details fetched successfully",
      result: data,
    });
  } catch (error) {
    console.log("error :-", error);
    res.status(500).send({
      message: "something went wrong",
      error: error,
    });
  }
};

// Update by user's Id
exports.updateUserDetails = async (req, res) => {
  try {
    const email = req.body.email;
    const full_name = req.body.full_name;
    const age = req.body.age;
    const phone = req.body.phone;
    const address = req.body.address;
    const userData = db.collection("users").doc(req.params.id);
    const data = await userData.update({
      email: email,
      phone: phone,
      age: age,
      address: address,
      full_name: full_name,
    });
    res.status(200).send({
      message: "User details updated successfully",
      result: data,
    });
  } catch (error) {
    console.log("error :-", error);
    res.status(500).send({
      message: "something went wrong",
      error: error,
    });
  }
};

// Delete User by Id
exports.DeleteUserDetails = async (req, res) => {
  try {
    const userData = db.collection("users").doc(req.params.id);
    const data = await userData.delete();
    res.status(200).send({
      message: "User details deleted successfully",
      result: data,
    });
  } catch (error) {
    console.log("error :-", error);
    res.status(500).send({
      message: "something went wrong",
      error: error,
    });
  }
};
