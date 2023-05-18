const express = require("express");
const cookieParser = require("cookie-parser");
const fileUpload = require("express-fileupload");


const app = express();
const port = process.env.PORT || 5000;

require("dotenv").config();

app.use(express.json());
app.use(cookieParser());
app.use(fileUpload());

const apiRoutes = require("./routes/apiRoutes");
const connectDB = require("./config/db");
const Product = require("./models/ProductModel");

connectDB();

app.use("/api", apiRoutes);

// Handle errors
app.use((error, req, res, next) => {
  if (process.env.NODE_ENV === "development") {
    console.error(error);
  }
  next(error);
});

app.use((error, req, res, next) => {
  if (process.env.NODE_ENV === "development") {
    res.status(500).json({
      message: error.message,
      stack: error.stack,
    });
  } else {
    res.status(500).json({
      message: error.message,
    });
  }
});



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});