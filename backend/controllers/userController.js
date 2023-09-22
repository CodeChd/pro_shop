import jwt from "jsonwebtoken";
import asyncHandler from "../middleware/asynHandler.js";
import User from "../models/userModel.js";

// @desc    Auth User & get token
// @routes  POST /api/users/login
// @access  Public
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    //set jwt as http-only cookie
    res.cookie("jwt", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development",
      sameSite: "strict",
      maxAge: 30 * 24 * 60,
    });

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});

// @desc    Register User
// @routes  POST /api/users
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  res.send("Register user");
});

// @desc    Logout User  / clear cookie
// @routes  POST /api/users/logout
// @access  Private
const logoutUser = asyncHandler(async (req, res) => {
  res.send("Logout user");
});

// @desc    Get user profile
// @routes  POST /api/users/profile
// @access  Private
const getUserProfile = asyncHandler(async (req, res) => {
  res.send("Get User Profile");
});

// @desc    Update user profile
// @routes  PUT /api/users/profile
// @access  Private
const updateUserProfile = asyncHandler(async (req, res) => {
  res.send("Update User Profile");
});

// @desc    Get users
// @routes  GET /api/users
// @access  Private/Admin
const getUsers = asyncHandler(async (req, res) => {
  res.send("Get Users");
});

// @desc    Get user by ID
// @routes  GET /api/users/:id
// @access  Private/Admin
const getUserById = asyncHandler(async (req, res) => {
  res.send("Get User by Id");
});

// @desc    Delete user
// @routes  DELETE /api/users/:id
// @access  Private/Admin
const deleteUser = asyncHandler(async (req, res) => {
  res.send("Delete Users");
});

// @desc    Update user
// @routes  PUT /api/users/:id
// @access  Private/Admin
const updateUser = asyncHandler(async (req, res) => {
  res.send("update Users");
});

export {
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  deleteUser,
  getUserById,
  updateUser,
};
