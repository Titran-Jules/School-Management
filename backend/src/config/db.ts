import pg from "pg";
import dotenv from "dotenv";

dotenv.config();

const { Pool } = pg;

export const db = new Pool({
    host: process.env.DB_HOST || 'localhost',
    port: Number(process.env.DB_PORT) || 5432,
    user: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'school_db',
    max: 10,
    idleTimeoutMillis: 30000,
});

db.on('connect', () => {
    console.log("Connexion to school_db database!");
});

db.on('error', (err) => {
    console.log("Error: ", err);
    process.exit(-1);
});