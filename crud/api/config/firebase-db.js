const admin = require("firebase-admin");
const credentials = require("../../firebaseServiceKey.json");

admin.initializeApp({
  credential: admin.credential.cert(credentials),
  databaseURL: "https://node-test-project-3d4c5.firebaseio.com", // Firebase database URL
});

const db = admin.firestore();
console.log("Firestore connected successfully");

module.exports = db;
