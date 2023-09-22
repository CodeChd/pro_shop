import jwt from "jsonwebtoken";
import asyncHandler from "./asynHandler";
import User from "../models/userModel";

// Protect Routes
export const protect = asyncHandler(async (req, res, next) => {
  let token;

  // Read the jwt from the cookie
  token = req.cookies.jwt;

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      await User.findById(decoded.userId);
    } catch (error) {}
  } else {
    res.status(401);
    throw new Error("Not authorized, no token");
  }
});
