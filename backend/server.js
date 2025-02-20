const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const routes = require("./routes"); // Import the routes index file
require("dotenv").config();
 
const app = express();
app.use(cors());
app.use(express.json());

mongoose
  .connect("mongodb://localhost:27017/expense-tracker", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

app.use("/api", routes); // Use the routes index file
app.get("/", (req, res) => {
  res.send("Welcome to expense api");
});
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
