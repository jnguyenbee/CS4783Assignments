require('dotenv').config({ path: './.env' });
const express = require('express');
const app = express();
const PORT = 12110;

const swaggerDoc = require('./swaggerDoc.js');

// Define Routes
app.use('/hello', require('./routes/hello'));
app.use('/properties', require('./routes/properties'));
swaggerDoc(app);
// npm run server
app.listen(PORT, () => console.log(`Server started on port ${PORT}!`));