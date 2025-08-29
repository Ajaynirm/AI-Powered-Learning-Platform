import mysql from "mysql2";
import dotenv from "dotenv";
dotenv.config();

const pool = mysql.createPool({
  uri: process.env.DB_URI,
    ssl: {
      rejectUnauthorized: false, 
    },
});

pool.getConnection((err, connection) => {
  if (err) {
    console.error("Error connecting to MySQL:", err);
    return;
  }
  console.log("Connected to MySQL database!");
  connection.release();
});

export default pool;
