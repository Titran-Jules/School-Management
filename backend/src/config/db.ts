import pg from "pg";
import dotenv from "dotenv";

dotenv.config();

const { Pool } = pg;

const connectionString = process.env.DATABASE_URL;

const isLocal = !connectionString || connectionString.includes("localhost") || connectionString.includes("127.0.0.1");

export const db = new Pool({
    connectionString: connectionString,
    ssl: isLocal ? false : { rejectUnauthorized: false }
});

db.on('connect', () => {});

db.on('error', (err) => {
    console.error("Error PostgreSQL :", err);
});