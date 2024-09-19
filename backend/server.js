// import express from "express";
// import dotenv from "dotenv";
// import connectDB from "./config/db.js";
// import authRoutes from "./routes/authRoutes.js";
// import authenticate from "./passport.js";
// import session from "express-session";
// import cookieParser from "cookie-parser";
// import protectedRoutes from "./routes/protectedRoutes.js";

// dotenv.config();
// connectDB();

// const app = express();
// const PORT = process.env.PORT || 5000;

// app.use(cookieParser());
// app.use(express.json());
// import "module-alias/register.js";

// app.use(
//   session({
//     secret: process.env.SESSION_SECRET,
//     resave: false,
//     saveUninitialized: false,
//   })
// );

// // Apply authentication middleware to protected routes
// app.use("/api/v1/auth/protected", authenticate, protectedRoutes);

// // Registration and login routes remain public
// app.use("/api/v1/auth", authRoutes);

// app.use((req, res) => {
//   res.status(404).json({ message: "Route not found" });
// });

// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });

import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import authenticate from "./middleware/authMiddleware.js";
import protectedRoutes from "./routes/protectedRoutes.js";

dotenv.config();
connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

// Apply authentication middleware to protected routes
app.use("/api/v1/auth/protected", authenticate, protectedRoutes);

// Registration and login routes remain public
app.use("/api/v1/auth", authRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
