const express = require("express");
const app = express();
require("dotenv").config();
const userRoutes = require("./api/routes/user");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// APIs integration with firebase
app.use("/api/", userRoutes);
module.exports = app;
