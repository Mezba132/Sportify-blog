const express = require("express");
require("dotenv").config();
const mongoose = require("mongoose");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const authRoutes = require("./Routes/Auth");
const userRoutes = require("./Routes/User");

const blogRoutes = require("./Routes/Blog");
const categoryRoutes = require("./Routes/Category");

const app = express();

mongoose
  .connect(process.env.DB, {
    serverSelectionTimeoutMS: 5000,
    socketTimeoutMS: 45000,
  })
  .then(() => console.log("Database is connected successfully"))
  .catch(() => console.log("Check your DB"));

const corsOptions = {
  origin: "*",
  credentials: true,
};

app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors(corsOptions));

app.use("/api", authRoutes);
app.use("/api", userRoutes);
app.use("/api", blogRoutes);
app.use("/api", categoryRoutes);

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
