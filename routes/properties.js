const express = require('express');
const db = require('./db');
const router = express.Router();

// @route   GET /properties
// @desc    properties route
// @access  Public
router.get('/', async (req, res, next) => {
    try {
        let results = await db.all();
        res.json(results);
        res.status(200).end
    } catch(e) {
        console.log(e);
        res.sendStatus(500);
    }
});

module.exports = router;