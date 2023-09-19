import express from "express";
import Product from "./models/productModel.js";
import asyncHandler from "../middleware/asynHandler.js";

const router = express.Router();

router.get(
  "/",
  asyncHandler(async (req, res) => {
    const product = await Product.find({});
    res.json(product);
  })
);

router.get(
  "/:id",
  asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (product) {
      return res.json(product);
    }

    res.status(404).json({ message: "Product not found" });
  })
);

export default router;
