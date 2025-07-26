const mysql = require('mysql2/promise');
const dotenv = require('dotenv');

dotenv.config({ quiet: true });

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT || 5000,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

(async () => {
  try {
    const [rows] = await pool.query('SELECT 1');
    console.log(' MySQL pool connected');
  } catch (err) {
    console.error('❌ Pool connection failed:', err);
    process.exit(1);
  }
})();

module.exports = pool;
// config/db.js
// const mysql = require('mysql2/promise');
// const dotenv = require('dotenv');

// dotenv.config();

// const pool = mysql.createPool({
//   host: process.env.DB_HOST || 'localhost',
//   user: process.env.DB_USER || 'root',
//   password: process.env.DB_PASSWORD || '',
//   database: process.env.DB_NAME || 'imsp_db',
//   port: process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : 3306,
//   waitForConnections: true,
//   connectionLimit: 10,
//   queueLimit: 0,
// });

// (async () => {
//   try {
//     const [rows] = await pool.query('SELECT 1');
//     console.log('✅ MySQL pool connected');
//   } catch (err) {
//     console.error('❌ MySQL pool connection failed:', err);
//     process.exit(1);
//   }
// })();

// module.exports = pool;
