const express = require("express");
const { User } = require("../models/index");
const router = express.Router();
const passport = require("passport");
const { MainController } = require("../controllers/MainController");
const { schemaLogin } = require("../schema");
const Local = require("passport-local").Strategy;

router.post("/register", MainController.register);

router.post("/login", passport.authenticate("local"), MainController.login);
router.get("/verify", MainController.isVerify);
router.get("/sendEmail/:email", MainController.sendForgotEmail);
passport.use(
  "local",
  new Local(async function (username, password, done) {
    try {
      const { error, value } = schemaLogin.validate({ username, password });
      if (error) {
        return done({ error: error.details }, false);
      }
      let user = await User.findOne({
        where: {
          email: username,
        },
      });
      if (user) {
        done(null, user);
      } else {
        done(null, false);
      }
    } catch (err) {}
  })
);

passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(async function (id, done) {
  let user = await User.findOne({
    where: {
      id: id,
    },
  });
  done(null, user);
});

module.exports = { router };
