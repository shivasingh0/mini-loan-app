const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const loanRoutes = require("./routes/loanRoutes");
const authRoutes = require("./routes/authRoutes");
var cors = require("cors");

dotenv.config();

connectDB();

const app = express();

app.use(
  cors({
    origin: "*",
  })
);
app.use(express.json());

app.get("/", (req, res) => res.send("API is running..."));
app.use("/api/loans", loanRoutes);
app.use("/api/users", authRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`Server running on port ${PORT}`));
