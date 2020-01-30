const express = require('express');
const router = express.Router();

// @route   GET /hello
// @desc    hello route
// @access  Public
router.get('/', function (req, res) {
    var json = [{"message": "hello yourself"}];
    res.status(200).end(JSON.stringify(json));
});

module.exports = router;