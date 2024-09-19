// import express from "express";
// const router = express.Router();

// router.get("/profile", (req, res) => {
//   // Only authenticated users can access this route
//   res.json({ message: "Hello, authenticated user!" });
// });

// // Add more protected routes here

// export default router;

import express from "express";
import authenticate from "../middleware/authMiddleware.js";
import authenticateRole from "../middleware/roleMiddleware.js";

const router = express.Router();

router.get(
  "/admin-dashboard",
  authenticate,
  authenticateRole("admin"),
  (req, res) => {
    res.json({ message: "Welcome, Admin!" });
  }
);

router.get(
  "/user-dashboard",
  authenticate,
  authenticateRole("user"),
  (req, res) => {
    res.json({ message: "Welcome, User!" });
  }
);

// Add more protected routes here

export default router;
