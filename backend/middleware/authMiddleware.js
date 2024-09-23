import jwt from "jsonwebtoken";

const authenticate = async (req, res, next) => {
  const cookie = req.cookies.jwt;

  if (!cookie) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const decoded = jwt.verify(cookie, process.env.JWT_SECRET);
    req.user = decoded;

    // Add role-based authentication
    if (!req.user.role) {
      return res.status(403).json({ message: "Forbidden" });
    }

    next();
  } catch (error) {
    // Comprehensive error handling
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Token expired" });
    } else if (error.name === "JsonWebTokenError") {
      return res.status(401).json({ message: "Invalid token" });
    } else {
      console.error("Authentication error:", error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }
};

export default authenticate;
