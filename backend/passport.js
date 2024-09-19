// import dotenv from "dotenv";
// dotenv.config();

// import passport from "passport";
// import { Strategy as GoogleStrategy } from "passport-google-oauth20";

// passport.use(
//   new GoogleStrategy(
//     {
//       clientID: process.env.GOOGLE_CLIENT_ID,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//       callbackURL: "/auth/google/callback",
//       scope: ["profile", "email"],
//     },
//     (accessToken, refreshToken, profile, cb) => {
//       // Handle user authentication
//       console.log(profile);
//       return cb(null, profile);
//     }
//   )
// );

// passport.serializeUser((user, done) => {
//   done(null, user);
// });

// passport.deserializeUser((user, done) => {
//   done(null, user);
// });

// --------------------------------------------------------------------------------

// import passport from "passport";
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
