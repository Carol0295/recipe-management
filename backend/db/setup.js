import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

let dbInstance = null;
const dbName = 'recipe_management';

const initializeDatabase = async () => {

    if(dbInstance){
        return dbInstance;
    }
    const {DB_HOST, DB_PORT, DB_USER, DB_PASS} = process.env;

    try {
        const conn = await mysql.createConnection({
            host: DB_HOST,
            port: DB_PORT,
            user: DB_USER,
            password: DB_PASS,
        });

        //Creates the db if not exists
        await conn.query(`CREATE DATABASE IF NOT EXISTS \`${dbName}\``);

        //Select the db
        await conn.query(`USE \`${dbName}\``);

        //creates the table example
        await conn.query(`
            CREATE TABLE IF NOT EXISTS recipes (
            id INT AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(100) NOT NULL,
            description TEXT
        )`);
        console.log(`table 'recipes' ready`);

        dbInstance = conn;
        return dbInstance;

    } catch (error){
        console.warn(`Error initializing database. ERROR: ${error}`);
        throw error;
    }
}

export default initializeDatabase;