import mysql from "mysql2/promise";
import 'dotenv/config'

const pool = await mysql.createPool({
  host: "localhost",
  password: process.env.MYSQL_PASSWORD,
  user: "root",
  database: "mydb",
  waitForConnections: true,
  connectionLimit: 10,
});

export default pool;