const router = require("express").Router();
const passport = require("passport");

router.get("/github",
  passport.authenticate("github", { scope: ["user:email"] })
);

router.get(
  "/github/callback",
  passport.authenticate("github", { failureRedirect: "/" }),
  (req, res) => {
    res.redirect("/doctors");
  }
);

module.exports = router;