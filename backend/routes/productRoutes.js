import express from "express";
import {
  getProducts,
  getProductById,
} from "../controllers/productController.js";

const router = express.Router();

router.route("/").get(getProducts);
router.route("/:id").get(getProductById);

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
