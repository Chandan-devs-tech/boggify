// import jwt from "jsonwebtoken";

// const authenticate = async (req, res, next) => {
//   const cookie = req.cookies.jwt;

//   if (!cookie) {
//     return res.status(401).json({ message: "Unauthorized" });
//   }

//   try {
//     const decoded = jwt.verify(cookie, process.env.JWT_SECRET);
//     req.user = decoded;
//     next();
//   } catch (error) {
//     console.error("Authentication error:", error);
//     return res.status(403).json({ message: "Token expired or invalid" });
//   }
// };

// export default authenticate;

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
    if (!req.user.roleId) {
      return res.status(403).json({ message: "Forbidden" });
    }

    next();
  } catch (error) {
    console.error("Authentication error:", error);
    return res.status(403).json({ message: "Token expired or invalid" });
  }
};

export default authenticate;
