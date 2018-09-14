const express = require("express");

const router = express.Router();

// @route GET api/directory
// @desc
// @access

router.get("/test", (request, response) => response.json({msg: "Directory"}));

module.exports = router;
