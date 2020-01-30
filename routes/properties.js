const express = require('express');
const router = express.Router();

// @route   GET /properties
// @desc    properties route
// @access  Public
router.get('/', function (req, res) {
    var json = [{"message": "properties!"}];
    res.status(200).end(JSON.stringify(json));
});

module.exports = router;