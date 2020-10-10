const express = require("express");
const mongoose = require("mongoose");
require("colors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.info(`Server running on port ${PORT}...`.red);
});
