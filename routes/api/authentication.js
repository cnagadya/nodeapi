const express = require("express");
const bcrypt = require("bcryptjs");
const router = express.Router();

const User = require("../../models/Auth");

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

module.exports = router;
