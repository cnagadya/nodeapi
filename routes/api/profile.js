const express = require("express");

const router = express.Router();

// @route GET api/profile
// @desc
// @access

router.get("/test", (request, response) => response.json({msg: "User profile"}));

module.exports = router;
