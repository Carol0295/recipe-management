// backend/db.js
'use strict';

import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config(); // load the variables from .env

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: 'recipe_management',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

console.log(`Connected to MySQL at ${process.env.DB_HOST}:${process.env.DB_PORT} as ${process.env.DB_USER}`);

export default pool;
