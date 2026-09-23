const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const competitionRoutes = require("./routes/competitionRoutes");

const app = express();

app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");

    app.listen(process.env.PORT || 5000, () => {
      console.log(
        `Server running on port ${
          process.env.PORT || 5000
        }`
      );
    });
  })
  .catch((error) => {
    console.error(
      "MongoDB connection failed:",
      error
    );
  });

app.use(
  "/api/competitions",
  competitionRoutes
);