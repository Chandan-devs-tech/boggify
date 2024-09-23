import jwt from "jsonwebtoken";
import User from "./models/userModel.js";

const authenticate = (req, res, next) => {
  const token = req.cookies.jwt;
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, payload) => {
    if (err) {
      return res.status(403).json({ message: "Forbidden" });
    }
    User.findById(payload.userId)
      .then((user) => {
        if (!user) {
          return res.status(401).json({ message: "Unauthorized" });
        }
        req.user = user;
        next();
      })
      .catch((err) => {
        return res.status(500).json({ message: "Internal Server Error" });
      });
  });
};

export default authenticate;
