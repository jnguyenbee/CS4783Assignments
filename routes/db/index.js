const mysql = require('mysql');

const pool = mysql.createPool({
    connectionLimit: 10,
    password: process.env.DATABASE_PASSWORD,
    user: process.env.DATABASE_USERNAME,
    host: process.env.DATABASE_HOST,
    port: process.env.DATABASE_PORT,
    database: process.env.DATABASE_NAME
});

let propertiesdb = []

// returns all properties from the DB
propertiesdb.all = () => {
    return new Promise((resolve, reject) => {
        pool.query('SELECT id, address, zip FROM properties order by id asc', (err, results) => {
            if(err) {
                return reject(err);
            }
            return resolve(results);
        });
    });
};

module.exports = propertiesdb