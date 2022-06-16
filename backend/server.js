const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const app = express();
dotenv.config();
mongoose
  .connect(process.envMONGODB_URI)
  .then(() => {
    console.log("connected to db");
  })
  .catch((error) => console.log(error));

// convert data to json
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// routes
import userRoutes from "./routes/userRoutes.js";
app.use("/api/users", userRoutes);

// when error something on backend
app.use((err, req, res, next) => {
  res.status(500).send({ message: err.message });
});

const port = process.env.PORT || 5500;
app.listen(port, () =>
  console.log(
    `Server running on port:${port} \n serve at http://localhost:${port}`
  )
);
