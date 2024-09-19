const authenticateRole = (requiredRole) => {
  return (req, res, next) => {
    if (req.user && req.user.roleId === requiredRole) {
      next();
    } else {
      res.status(403).send("Forbidden");
    }
  };
};

export default authenticateRole;
