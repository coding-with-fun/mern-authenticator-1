const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("colors");
require("dotenv").config();

// Setup Express server
const app = express();
app.use(express.json());
app.use(cors());
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.info(`Server running on port ${PORT}...`.red);
});

app.use("/", require("./routes/homeRouter"));
app.use("/user", require("./routes/userRouter"));

// Setup MongoDB
mongoose.connect(
  process.env.MONGODB_CONNECTION_STRING,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  },
  (err) => {
    if (err) throw err;
    console.info("Connected to MongoDB...".red);
  }
);
