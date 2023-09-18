import express from "express";
import cors from 'cors'
import dotenv from "dotenv";
dotenv.config() // to utilize .env file values
import { productsItems } from "./data/product.js";
const port = process.env.PORT || 8000;

const app = express();

app.use(cors())

app.get("/", (req, res) => {
  res.send("Api is healthy");
});

app.get("/api/products", (req, res) => {
  res.json(productsItems);
});

app.get("/api/products/:id", (req, res) => {
  const product = productsItems.find((item) => item._id === req.params.id);
  res.json(product);
});

app.listen(port, () => console.log(`Server running on port ${port}`));
