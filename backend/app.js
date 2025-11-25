const express = require("express");
require("dotenv").config();
const mongoose = require("mongoose");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const http = require("http");

const authRoutes = require("./Routes/Auth");
const userRoutes = require("./Routes/User");

const app = express();

mongoose
  .connect(process.env.DB, {
    serverSelectionTimeoutMS: 5000,
    socketTimeoutMS: 45000,
  })
  .then(() => console.log("Database is connected successfully"))
  .catch(() => console.log("Check your DB"));

const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true,
};

app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors(corsOptions));

app.use("/api", authRoutes);
app.use("/api", userRoutes);

const port = process.env.PORT || 8000;
const server = http.createServer(app);

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
