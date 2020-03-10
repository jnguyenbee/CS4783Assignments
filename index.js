require('dotenv').config({ path: './.env' });
const express = require('express');
var http = require('http');
const https = require('https');
const fs = require('fs')
const app = express();
const swaggerDoc = require('./swaggerDoc.js');

const HTTPSPORT = process.env.HTTPSPORT || 12111;

// keys for https
var options = {
  key: fs.readFileSync('server.key'),
  cert: fs.readFileSync('server.cert')
}

// Define Routes
app.use('/hello', require('./routes/hello'));
app.use('/properties', require('./routes/properties'));

// Swagger
swaggerDoc(app);

// create https server
https.createServer(options, app).listen(HTTPSPORT);