import express from "express";
import dotenv from "dotenv";
dotenv.config(); // to utilize .env file values
import connectDB from "./config/db.js";
// import { productsItems } from "./data/product.js"; fake data
import { errHandler, notFound } from "./middleware/errorMiddleware.js";
import productRoutes from "./routes/productRoutes.js";
const port = process.env.PORT || 8000;
connectDB(); //Connect to MongoDB

const app = express();

app.get("/", (req, res) => {
  res.send("Api is healthy");
});

app.use("/api/products", productRoutes);

app.use(notFound);
app.use(errHandler);

app.listen(port, () => console.log(`Server running on port ${port}`));
