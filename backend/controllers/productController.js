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

// @desc Create a product
// @routes GET /api/products
// @access Public
const createProduct = asyncHandler(async (req, res) => {
  const product = new Product({
    name: "Product",
    price: 0,
    user: req.user._id,
    image: "/images/sample.jpg",
    brand: "Brand",
    category: "Category",
    countInStock: 0,
    numReviews: 0,
    description: "Description",
  });

  const createdProduct = await product.save();

  res.status(201).json(createdProduct);
});

// @desc  Update a product
// @routes PUT /api/products/:id
// @access Private
const updateProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  const { name, price, description, image, brand, category, countInStock } =
    req.body;

  if (product) {
    product.name = name;
    product.price = price;
    product.description = description;
    product.image = image;
    product.brand = brand;
    product.category = category;
    product.countInStock = countInStock;

    const updateProduct = await product.save();

    res.status(200).json(updateProduct);
  } else {
    res.status(404);
    throw new Error("Resource not found");
  }
});

export { getProducts, getProductById, createProduct, updateProduct };
