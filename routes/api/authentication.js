const express = require("express");

const router = express.Router();

// @route GET api/auth
// @desc
// @access

router.get("/test", (request, response) => response.json({msg: "Auth"}));

module.exports = router;
