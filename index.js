require('dotenv').config({ path: './.env' });
const express = require('express');
const https = require('https');
const fs = require('fs')
const app = express();
const PORT = 12110;
const swaggerDoc = require('./swaggerDoc.js');

https.createServer({
    key: fs.readFileSync('server.key'),
    cert: fs.readFileSync('server.cert')
  }, app).listen(PORT, () => {
    console.log('Listening...')
  })

// Define Routes
app.use('/hello', require('./routes/hello'));
app.use('/properties', require('./routes/properties'));
swaggerDoc(app);
// npm run server
app.listen(PORT, () => console.log(`Server started on port ${PORT}!`));