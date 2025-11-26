const router = require("express").Router();
const passport = require("passport");

router.get("/github",
  passport.authenticate("github", { scope: ["user:email"] })
);

router.get(
  "/github/callback",
  passport.authenticate("github", { failureRedirect: "/" }),
  (req, res) => {
    res.redirect("http://localhost:5500");
  }
);

// Returns logged-in user info
router.get("/me", (req, res) => {
  if (!req.isAuthenticated()) {
    return res.status(401).json({ message: "Not logged in" });
  }
  res.json(req.user);
});

// Logout
router.get("/logout", (req, res) => {
  req.logout(err => {
    if (err) return next(err);

    req.session.destroy(() => {
      res.clearCookie("connect.sid");
      res.redirect("http://localhost:5500");
    });
  });
});

module.exports = router;