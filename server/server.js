const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
const connectDB = require("./config/db");
connectDB();

app.use(cors());
app.use(express.json());

//ROUTES
const authRoutes = require("./routes/authRoutes");
const contentRoutes = require("./routes/contentRoutes");

app.use("/api/contents", contentRoutes);
app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
  res.send("Server is running");
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
