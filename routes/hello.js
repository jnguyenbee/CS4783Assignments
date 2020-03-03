const express = require('express');
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Hello
 *   description: Simple API
 */

/**
 * @swagger
 * definitions:
 *  msg:
 *    type: object
 *    properties:
 *      message:
 *       type: string
 */

// @route   GET /hello
// @desc    hello route
// @access  Public

/**
 * @swagger
 * /hello:
 *   get:
 *     tags:
 *       - Hello
 *     description: Hello World
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *          description: Successfully Retrieve a Property
 *          schema:
 *           type: object
 *           items:
 *              $ref: '#/definitions/msg'
 *           example:
 *              message: hello yourself
 *
 */
router.get('/', function(req, res) {
    var json = [{ message: 'hello yourself' }];
    res.status(200).end(JSON.stringify(json));
});

module.exports = router;