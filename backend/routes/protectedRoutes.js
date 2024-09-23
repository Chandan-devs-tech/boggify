import express from "express";
import authenticate from "../middleware/authMiddleware.js";
import authenticateRole from "../middleware/roleMiddleware.js";

const router = express.Router();

// Apply authenticate middleware to all protected routes
router.use(authenticate);

router.get("/admin-dashboard", authenticateRole("admin"), (req, res) => {
  res.json({ message: "Welcome, Admin!" });
});

router.get("/user-dashboard", authenticateRole("user"), (req, res) => {
  res.json({ message: "Welcome, User!" });
});

// Add more protected routes here
router.get("/profile", (req, res) => {
  res.json({ message: `Hello, ${req.user.name}! Your ID is ${req.user._id}` });
});

export default router;
