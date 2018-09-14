const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../../models/Auth");
const secret = require("../../config/keys");

const router = express.Router();

// @route GET api/auth/test
// @desc Tests the auth routes
// @access Public
router.get("/test", (request, response) => response.json({ msg: "Auth" }));

// @route POST api/auth/register
// @desc Registers the user
// @access Public
router.post("/register", (request, response) => {
  User.findOne({ email: request.body.email }).then(user => {
    if (user) {
      return response.status(400).json({ email: "Email Already estists" });
    } else {
      const newUser = new User({
        name: request.body.name,
        email: request.body.email,
        password: request.body.password
      });
      bcrypt.genSalt(10, (error, salt) => {
        bcrypt.hash(newUser.password, salt, (error, hash) => {
          if (error) throw error;
          newUser.password = hash;
          newUser
            .save()
            .then(user => response.json(user))
            .catch(error => console.log(error));
        });
      });
    }
  });
});

// @route POST api/auth/login
// @desc Returns token for valid credentials
// @access Public
router.post("/login", (request, response) => {
  const email = request.body.email;
  const password = request.body.password;

  User.findOne({ email: email }).then(user => {
    if (!user)
      return response.status(404).json({ email: `No user with ${email}` });
    bcrypt.compare(password, user.password).then(passwordMatches => {
      if (passwordMatches) {
        const userInfo = {
          id: user.id,
          name: user.name
        };
        jwt.sign(
          userInfo,
          secret.secret,
          { expiresIn: 3600 },
          (error, token) => {
            response.json({
              sucess: "Succesfully logged in",
              token: `Bearer ${token}`
            });
          }
        );
      } else response.status(404).json({ password: "Invalid password" });
    });
  });
});

module.exports = router;
