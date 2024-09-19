import express from "express";
import {
  registerUser,
  loginUser,
  logoutUser,
} from "../controllers/authController.js";
import authenticate from "../middleware/authMiddleware.js";
import googleRoutes from "./googleRoutes.js";

const router = express.Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/profile").get(authenticate, (req, res) => {
  res.json({ message: "Hello, authenticated user!" });
});
router.route("/logout").post(authenticate, logoutUser);

router.use("/auth", googleRoutes);

export default router;
