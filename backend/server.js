import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import bodyParser from "body-parser";

dotenv.config();
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("connected to db");
  })
  .catch((error) => console.log(error));

const app = express();
// convert data to json
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// routes

app.get("/api/keys/paypal", (req, res) => {
  res.send(process.env.PAYPAL_CLIENT_ID || "sb");
});

import userRoutes from "./routes/userRoutes.js";
import seedRouter from "./routes/seedRoutes.js";
import productRouter from "./routes/productRoutes.js";
import orderRouter from "./routes/orderRoutes.js";
// http://localhost:5000/api/seed
app.use("/api/seed", seedRouter);
app.use("/api/users", userRoutes);
// http://localhost:5000/api/products
app.use("/api/products", productRouter);
app.use("/api/orders", orderRouter);

// when error something on backend
app.use((err, req, res, next) => {
  res.status(500).send({ message: err.message });
});

const port = process.env.PORT || 5000;
app.listen(port, () =>
  console.log(
    `Server running on port:${port} \n Serve at http://localhost:${port}`
  )
);
