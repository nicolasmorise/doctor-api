module.exports = function ensureAuth(req, res, next) {
  if (req.isAuthenticated()) return next();

  res.status(401).json({
    message: "You don't have access to this route. Please log in first."
  });
};
