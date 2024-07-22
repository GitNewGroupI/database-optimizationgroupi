const { Pool } = require('pg');

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'shopease',
    password: 'pasca3r55',
    port: 5432,
});

module.exports = pool;