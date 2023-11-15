const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config(); // Loads env variables from .env

const app = express();
const PORT = process.env.PORT || 3001;

// middleware to parse json requests
app.use(express.json());

// connect to mongo db

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB");
  app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
  });
});
