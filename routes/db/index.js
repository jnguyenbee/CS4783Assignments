const mysql = require('mysql');

// database login information
const pool = mysql.createConnection({
    connectionLimit: 10,
    password: process.env.DATABASE_PASSWORD,
    user: process.env.DATABASE_USERNAME,
    host: process.env.DATABASE_HOST,
    port: process.env.DATABASE_PORT,
    database: process.env.DATABASE_NAME
});

// connect to database
pool.connect((err) => {
    try {
        if(!err) {
            console.log("Connected to database")
        } else {
            throw new Error()
        }
    } catch(e) {
        console.log(e)
        console.log("Connection to database failed")
    }
});

module.exports = pool