const express = require("express");
const cors = require("cors");
require("dotenv").config();
const cookieParser = require('cookie-parser')
const connectDB = require("./config/db");
const router = require("./routes/index");

const app = express();
app.use(cors({
  origin: "http://localhost:3000",
  credentials: true
}));
app.use(express.json()); 
app.use(cookieParser())
app.use("/api", router);

const PORT = 8080 || process.env.PORT;

connectDB();
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
