const Pool = require('pg').Pool
const pool = new Pool({
    user: 'blueline',
    host: 'localhost',
    database: 'api',
    password: 'gratitude',
    port: 5432
 })