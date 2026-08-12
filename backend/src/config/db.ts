import pg from "pg";
import dotenv from "dotenv";

dotenv.config();

const { Pool } = pg;

export const db = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
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