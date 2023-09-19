import asyncHandler from "../middleware/asynHandler.js";
import Product from "../models/productModel.js";

// @desc Fetch All Products
// @routes GET /api/products
// @access Public
const getProducts = asyncHandler(async (req, res) => {
  const product = await Product.find({});
  res.json(product);
});

// @desc Fetch a Product
// @routes GET /api/products/:id
// @access Public
const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    return res.json(product);
  } else {
    res.status(404);
    throw new Error("Resource not found");
  }
});

export { getProducts, getProductById };
