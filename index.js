require('dotenv').config({path:'./.env'});
const express = require('express')
const app = express()
const PORT = process.env.PORT || 3000

// Define Routes
app.use('/hello', require('./routes/hello'))
app.use('/properties', require('./routes/properties'))

// npm run server
app.listen(PORT, () => console.log(`Server started on port ${PORT}!`))