const express = require('express');
const db = require('./db');
const bodyParser = require('body-parser')
const router = express.Router();

// body parsing set up
router.use(bodyParser.json())
router.use(bodyParser.urlencoded({ extended: true }))

// @route   GET /properties
// @desc    properties route
// @access  Public
router.get('/', (req, res) => {
    db.query('SELECT id, address, zip FROM properties ORDER BY id ASC', (err, rows, fields) => {
        try {
            if(err) throw err;
            
            // get rows and return 200 status
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
        // message object
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

// @route   GET /properties/:id
// @desc    properties route
// @access  Public
router.get('/:id', (req, res) => {
    db.query(`SELECT id, address, zip FROM properties WHERE ID = ${req.params.id}`, (err, rows, fields) => {
        try {
            if(err) throw err;
            
            // if no matches, send a 404 status
            if(rows.length == 0) {
                res.status(404).end
            }

            // get data and return 200 status
            res.send(rows);
            res.status(200).end
        } catch(e) {
            console.log(e);
            res.sendStatus(500);
        }
    });
});

// @route   DELETE /properties/:id
// @desc    properties route
// @access  Public
router.delete('/:id', (req, res) => {
    // delete id
    db.query(`DELETE FROM properties WHERE ID = ${req.params.id}`, (err, rows, fields) => {
        try {
            if(err) throw err;
            
            // if no rows affected, return 404 status
            if(rows.affectedRows == 0) {
                res.sendStatus(404).end;
            }
            
            // return 200 status if deletion is successful
            var json = [{"message": "deleted"}];
            res.status(200).end(JSON.stringify(json));
        } catch(e) {
            console.log(e);
            res.sendStatus(500);
        }
    });
});

module.exports = router;