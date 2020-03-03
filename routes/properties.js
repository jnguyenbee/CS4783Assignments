const express = require('express');
const db = require('./db');
const bodyParser = require('body-parser');
const router = express.Router();
const swaggerUi = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');

// body parsing set up
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

/**
 *
 * @swagger
 * openapi: 3.0.0
 * tags:
 *   name: Property
 *   description: Property management
 */

/**
 * components:
 *  securitySchemes:
 *    ApiKeyAuth:        # arbitrary name for the security scheme
 *     type: apiKey
 *     in: header       # can be "header", "query" or "cookie"
 *     name: X-API-KEY  # name of the header, query parameter or cookie
 */

/**
 * @swagger
 * definitions:
 *   property:
 *      properties:
 *        id:
 *          type: integer
 *        address:
 *         type: string
 *        state:
 *         type: string
 *        city:
 *         type: string
 *        zip:
 *         type: string
 *   postProperty:
 *      properties:
 *        address:
 *         type: string
 *         example: 123 Test Ave
 *        state:
 *         type: string
 *         example: TX
 *        city:
 *         type: string
 *         example: San Antonio
 *        zip:
 *         type: string
 *         example: 78222
 *   getProperty:
 *      properties:
 *        id:
 *          type: integer
 *        address:
 *         type: string
 *        zip:
 *         type: string
 */

// @route   GET /properties
// @desc    properties route
// @access  Public

/**
 * @swagger
 * /properties:
 *   get:
 *     tags:
 *       - Property
 *     description: Returns all properties
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: An array of properties
 *         schema:
 *              type: array
 *              items:
 *                $ref: '#/definitions/getProperty'
 */

// Can add example if needed
/*              example:
 *                  - id: 1
 *                    address: 123 Test Ave
 *                    zip: 78222
 *                  - id: 2
 *                    address: 123 Main Street
 *                    zip: 78222
 */
router.get('/', (req, res) => {
    db.query(
        'SELECT id, address, zip FROM properties ORDER BY id ASC',
        (err, rows, fields) => {
            try {
                if (err) throw err;

                // get rows and return 200 status
                res.send(rows);
                res.status(200).end;
            } catch (e) {
                console.log(e);
                res.sendStatus(500);
            }
        }
    );
});

// @route   POST /properties
// @desc    properties route
// @access  Public

/**
 * @swagger
 * /properties:
 *   post:
 *     tags:
 *       - Property
 *     description: Create a new Property
 *     parameters:
 *       - in : body
 *         name : property
 *         required: true
 *         schema:
 *             $ref: '#/definitions/postProperty'
 *       - in : header
 *         name: X-API-KEY
 *         schema:
 *          type: apiKey
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *          description: Successfully Created a Property
 *          schema:
 *              type: object
 *              items:
 *                  $ref: '#/definitions/msg'
 *              example:
 *                  message: added
 *       400:
 *          description: User Input Error
 *          schema:
 *              type: array
 *              items:
 *                $ref: '#/definitions/msg'
 *              example:
 *                  - message: address is not between 1 and 200 characters
 *                  - message: state is not 2 characters
 *                  - message: city is not between 1 and 50 characters
 *                  - message: zip is not between 5 and 10 characters
 *       401:
 *          description: Authoriation Error, Missing api-key
 *          schema:
 *              type: string
 *              example:
 *                  Unauthorized
 *
 */
router.post('/', function(req, res) {
    try {
        // message object
        var json = [];

        // check for validation
        if (!req.body.hasOwnProperty('address') ||
            1 > req.body.address.length ||
            200 < req.body.address.length
        ) {
            json.push({ message: 'address is not between 1 and 200 characters' });
            res.status(400);
        }

        if (!req.body.hasOwnProperty('city') ||
            1 > req.body.city.length ||
            50 < req.body.city.length
        ) {
            json.push({ message: 'city is not between 1 and 50 characters' });
            res.status(400);
        }

        if (!req.body.hasOwnProperty('state') || 2 != req.body.state.length) {
            json.push({ message: 'state is not 2 characters' });
            res.status(400);
        }

        if (!req.body.hasOwnProperty('zip') ||
            5 > req.body.zip.length ||
            10 < req.body.zip.length
        ) {
            json.push({ message: 'zip is not between 5 and 10 characters' });
            res.status(400);
        }

        // check status code
        if (res.statusCode == 400) {
            return res.end(JSON.stringify(json));
        }

        // check for auth
        var key = req.headers['x-api-key'];
        if (key != 'cs4783FTW') {
            res.sendStatus(401).end;
        } else {
            // run insert query if valid POST request
            db.query(
                `INSERT INTO properties (address, city, state, zip) VALUES (?, ?, ?, ?)`, [req.body.address, req.body.city, req.body.state, req.body.zip],
                (err, rows, fields) => {
                    try {
                        // if there is an error, throw it
                        if (err) throw err;
                    } catch (e) {
                        console.log(e);
                        res.sendStatus(500);
                    }
                }
            );

            // request is good
            json.push({ message: 'added' });
            return res.status(200).end(JSON.stringify(json));
        }
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
    res.send();
});

// @route   GET /properties/:id
// @desc    properties route
// @access  Public

/**
 * @swagger
 * /properties/{propertyId}:
 *   get:
 *     tags:
 *       - Property
 *     description: Find a new Property
 *     parameters:
 *       - in : path
 *         name : propertyId
 *         type: integer
 *         required: true
 *         description: Unique Property ID
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *          description: Successfully Retrieve a Property
 *          schema:
 *           type: object
 *           $ref: '#/definitions/property'
 *       404:
 *          description: Property not found
 */
router.get('/:id', (req, res) => {
    db.query(
        `SELECT id, address, city, state, zip FROM properties WHERE ID = ?`, [req.params.id],
        (err, rows, fields) => {
            try {
                if (err) throw err;

                // check id is int
                if (isNaN(parseInt(req.params.id, 10))) {
                    res.status(400).end;
                }

                // if no matches, send a 404 status
                else if (rows.length == 0) {
                    res.status(404).end;
                }

                // get data and return 200 status
                res.send(rows);
                res.status(200).end;
            } catch (e) {
                console.log(e);
                res.sendStatus(500);
            }
        }
    );
});

// @route   DELETE /properties/:id
// @desc    properties route
// @access  Public

/**
 * @swagger
 * /properties/{propertyId}:
 *   delete:
 *     tags:
 *       - Property
 *     description: Delete a Property
 *     parameters:
 *       - in : path
 *         name : propertyId
 *         type: integer
 *         required: true
 *         description: Unique Property ID
 *       - in : header
 *         name: X-API-KEY
 *         schema:
 *          type: apiKey
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *          description: Successfully Delete a Property
 *          schema:
 *           type: object
 *           item:
 *              $ref: '#/definitions/msg'
 *           example:
 *              message: deleted
 *       404:
 *          description: Property not found
 *          schema:
 *           type: string
 *           example:
 *             Not Found
 *       401:
 *          description: Authoriation Error, Missing api-key
 *          schema:
 *           type: string
 *           example:
 *             Unauthorized
 *
 */
router.delete('/:id', (req, res) => {
    // delete id

    // check for auth
    var key = req.headers['x-api-key'];
    if (key != 'cs4783FTW') {
        res.sendStatus(401).end();
    } else {
        db.query(
            `DELETE FROM properties WHERE ID = ?`, [req.params.id],
            (err, rows, fields) => {
                try {
                    if (err) throw err;

                    // check id is int
                    if (isNaN(parseInt(req.params.id, 10))) {
                        res.sendStatus(400).end;
                    }
                    // if no rows affected, return 404 status
                    else if (rows.affectedRows == 0) {
                        res.sendStatus(404).end;
                    }

                    // return 200 status if deletion is successful
                    var json = [{ message: 'deleted' }];
                    res.status(200).end(JSON.stringify(json));
                } catch (e) {
                    console.log(e);
                    res.sendStatus(500);
                }
            }
        );
    }
});

/**
 * @swagger
 * /properties/{propertyId}:
 *   put:
 *     tags:
 *       - Property
 *     description: Update a Property
 *     parameters:
 *       - in : path
 *         name : propertyId
 *         type: integer
 *         required: true
 *         description: Unique Property ID
 *       - in : header
 *         name: X-API-KEY
 *         schema:
 *          type: apiKey
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *          description: Successfully Update a Property
 *          schema:
 *           type: object
 *           item:
 *              $ref: '#/definitions/msg'
 *           example:
 *              message: updated
 *       404:
 *          description: Property not found
 *          schema:
 *           type: string
 *           example:
 *             Not Found
 *       401:
 *          description: Authoriation Error, Missing api-key
 *          schema:
 *           type: string
 *           example:
 *             Unauthorized
 *
 */
router.put('/:id', (req, res) => {
    // update id
    try {
        // message object
        var json = [];

        // TODO:
        if (isNaN(parseInt(req.params.id, 10))) {
            res.sendStatus(400).end;
        }

        // check for validation
        if (
            req.body.hasOwnProperty('address') &&
            (1 > req.body.address.length || 200 < req.body.address.length)
        ) {
            json.push({ message: 'address is not between 1 and 200 characters' });
            res.status(400);
        }

        if (
            req.body.hasOwnProperty('city') &&
            (1 > req.body.city.length || 50 < req.body.city.length)
        ) {
            json.push({ message: 'city is not between 1 and 50 characters' });
            res.status(400);
        }

        if (req.body.hasOwnProperty('state') && 2 != req.body.state.length) {
            json.push({ message: 'state is not 2 characters' });
            res.status(400);
        }

        if (
            req.body.hasOwnProperty('zip') &&
            (5 > req.body.zip.length || 10 < req.body.zip.length)
        ) {
            json.push({ message: 'zip is not between 5 and 10 characters' });
            res.status(400);
        }

        // check status code
        if (res.statusCode == 400) {
            return res.end(JSON.stringify(json));
        }

        // check for auth
        var key = req.headers['x-api-key'];
        if (key != 'cs4783FTW') {
            res.sendStatus(401).end;
        } else {
            db.query(
                `UPDATE properties SET 
                address = COALESCE(?, address),
                city = COALESCE(?, city), 
                state = COALESCE (?,state), 
                zip = COALESCE(?,zip)

            WHERE id = ? 

            `, [
                    req.body.address,
                    req.body.city,
                    req.body.state,
                    req.body.zip,
                    req.params.id
                ],
                (err, rows, fields) => {
                    try {
                        // if there is an error, throw it
                        if (err) throw err;
                    } catch (e) {
                        console.log(e);
                        res.sendStatus(500);
                    }
                }
            );
            // request is good
            json.push({ message: 'updated' });
            return res.status(200).end(JSON.stringify(json));
        }
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
    res.send();
});

module.exports = router;