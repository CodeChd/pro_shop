import express from "express";
import {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
} from "../controllers/productController.js";
import { admin, protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/").get(getProducts).post(protect, admin, createProduct);
router.route("/:id").get(getProductById).put(protect, admin, updateProduct);

// common router
// router.get(
//   "/",
//   asyncHandler(async (req, res) => {

//   })
// );

// router.get(
//   "/:id",
//   asyncHandler(async (req, res) => {

//   })
// );

export default router;
