const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const cors = require("cors");
const courseRoutes = require("./routes/courseRoute");
const { applyTimestamps } = require("./models/student");

dotenv.config();

connectDB();

const app = express();
app.use(cors());
app.use(
  cors({
    origin: "http://localhost:5173", // Replace with your exact React frontend URL
    credentials: true,
  }),
);

app.use(express.json());

app.use("/auth", authRoutes);
app.use("/", courseRoutes);

const Port = process.env.PORT || 5000;

app.listen(Port, () => {
  console.log(`Server is running on port http://localhost:${Port}`);
});
