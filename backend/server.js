import express from "express";
import dotenv from "dotenv";
dotenv.config(); // to utilize .env file values
import connectDB from "./config/db.js";
// import { productsItems } from "./data/product.js"; fake data
import { errHandler, notFound } from "./middleware/errorMiddleware.js";
import productRoutes from "./routes/productRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import cookieParser from "cookie-parser";
const port = process.env.PORT || 8000;
connectDB(); //Connect to MongoDB

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Cookie parser middleware
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("Api is healthy");
});
app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);
app.use("/api/orders", orderRoutes);

app.get("/api/config/paypal", (req, res) => {
  res.send({ clientId: process.env.PAYPAL_CLIENT_ID });
});

app.use(notFound);
app.use(errHandler);

app.listen(port, () => console.log(`Server running on port ${port}`));
