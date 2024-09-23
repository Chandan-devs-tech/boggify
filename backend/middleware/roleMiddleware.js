const authenticateRole = (requiredRole) => {
  return (req, res, next) => {
    // Check for role instead of roleId
    if (req.user && req.user.role === requiredRole) {
      next();
    } else {
      res.status(403).send("Forbidden");
    }
  };
};

export default authenticateRole;
