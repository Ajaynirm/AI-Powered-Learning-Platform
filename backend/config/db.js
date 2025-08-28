//MySQL connection


import { createPool } from 'mysql2';

const pool = createPool({
  host: '127.0.0.1',      // your MySQL host (e.g., 'localhost'),
  port: 3306,
  user: 'root',           // your MySQL username
  password: '12345678',  // your MySQL password
  database: 'ai_learning_platform_database'    // your database name
});



pool.getConnection((err, connection) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL database!');
  connection.release(); // Always release when using pool
});

export default pool;




