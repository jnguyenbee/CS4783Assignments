require('dotenv').config({ path: './.env' });
const express = require('express');
const https = require('https');
const fs = require('fs')
const app = express();
const swaggerDoc = require('./swaggerDoc.js');

const PORT = 12110;

https.createServer({
    key: fs.readFileSync('server.key'),
    cert: fs.readFileSync('server.cert')
  }, app).listen(PORT, () => {
    
    // Define Routes
    app.use('/hello', require('./routes/hello'));
    app.use('/properties', require('./routes/properties'));
    swaggerDoc(app);
    console.log(`Server started on poart ${PORT}!`);
});
