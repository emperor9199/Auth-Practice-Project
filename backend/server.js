const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const userRoute = require("./routes/users");
const privateRoute = require("./routes/privateRoute");

const app = express();
dotenv.config();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.DB_CONNECT, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.once("open", () => console.log("MongoDB Connected..."));

app.use("/users", userRoute);
app.use("/private", privateRoute);

app.get("/", (req, res) => {
  res.send("Ready to Work...");
});

app.listen(5000, () => console.log("Server is Running..."));
