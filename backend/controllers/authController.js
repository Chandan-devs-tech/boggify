import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import jwt from "jsonwebtoken";
import Joi from "joi";

// Define validation schemas
const registerSchema = Joi.object({
  name: Joi.string().required().min(3).max(50),
  email: Joi.string().email().required(),
  password: Joi.string().required().min(8).max(128),
});

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required().min(8).max(128),
});

// Generate Token function
const generateTokenReg = (id) => {
  const token = jwt.sign({ userId: id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
  return token;
};

// Register User
const registerUser = asyncHandler(async (req, res) => {
  const { error } = registerSchema.validate(req.body);
  if (error) {
    res.status(400).json({ message: error.details[0].message });
    return;
  }

  const { name, email, password } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  // Add roleId to the user object
  const user = await User.create({ name, email, password, roleId: "user" });

  const token = generateTokenReg(user._id);
  res.status(201).json({ _id: user._id, token });
});

// Login User
const loginUser = asyncHandler(async (req, res) => {
  const { error } = loginSchema.validate(req.body);
  if (error) {
    res.status(400).json({ message: error.details[0].message });
    return;
  }

  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user || !(await user.matchPassword(password))) {
    res.status(401);
    throw new Error("Invalid email or password");
  }

  generateToken(res, user._id);
});

// Generate Token
const generateToken = (res, userId) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "30m",
  });

  // Set JWT as an HTTP-Only cookie
  res.cookie("jwt", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== "development",
    sameSite: "strict",
    maxAge: 30 * 60 * 1000, // 30 minutes
  });

  return res.json({
    _id: userId,
    token,
  });
};

export { registerUser, loginUser };

export const logoutUser = asyncHandler(async (req, res) => {
  try {
    console.log("Logout started");
    res.clearCookie("jwt");
    console.log("Cookie removed");
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.error("Logout Error:", error);
    res.status(500).json({ message: "Logout failed" });
  }
});
