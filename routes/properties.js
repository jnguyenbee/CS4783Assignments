const express = require('express');
const db = require('./db');
const bodyParser = require('body-parser')
const router = express.Router();

router.use(bodyParser.json())
router.use(bodyParser.urlencoded({ extended: true }))

// @route   GET /properties
// @desc    properties route
// @access  Public
router.get('/', (req, res) => {
    db.query('SELECT id, address, zip FROM properties ORDER BY id ASC', (err, rows, fields) => {
        try {
            if(err) throw err;
            res.send(rows);
            res.status(200).end
        } catch(e) {
            console.log(e);
            res.sendStatus(500);
        }
    });
});

// @route   POST /properties
// @desc    properties route
// @access  Public
router.post('/', function(req, res) {
    try {
        var json = [];

        // check for validation
        if(1 > req.body.address.length || 200 < req.body.address.length) {
            json.push({"message": "address is not between 1 and 200 characters"});
            res.status(400);
        }
        
        if (1 > req.body.city.length || 50 < req.body.city.length) {
            json.push({"message": "city is not between 1 and 50 characters"});
            res.status(400);
        }

        if (2 != req.body.state.length) {
            json.push({"message": "state is not 2 characters"});
            res.status(400);
        }

        if (5 > req.body.zip.length || 10 < req.body.zip.length) {
            json.push({"message": "zip is not between 5 and 10 characters"});
            res.status(400);
        }
        
        // check status code
        if(res.statusCode == 400) {
            return res.end(JSON.stringify(json));
        }

        // run insert query if valid POST request
        db.query(`INSERT INTO properties (address, city, state, zip) VALUES ('${req.body.address}', '${req.body.city}', '${req.body.state}', '${req.body.zip}')`, (err, rows, fields) => {
            try {
                // if there is an error, throw it
                if(err) throw err;
            } catch(e) {
                console.log(e);
                res.sendStatus(500);
            }
        });

        // request is good
        json.push({"message": "added"});
        return res.status(200).end(JSON.stringify(json));
    } catch(e) {
        console.log(e);
        res.sendStatus(500);
    }
   res.send()
});

module.exports = router;