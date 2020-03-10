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
 *       type: object
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
    return res.status(200).json({ message: 'hello yourself' });
});

module.exports = router;