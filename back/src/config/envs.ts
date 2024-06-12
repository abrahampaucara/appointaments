import dotenv from "dotenv";
dotenv.config({path: "./src/config/.env"});

const PORT = process.env.PORT || 3000;
const PROTO = process.env.PROTO || "http";
const HOST = process.env.HOST || "localhost";
const DB_TYPE = process.env.DB_TYPE || "postgres";
const DB_HOST = process.env.DB_HOST || "localhost";
const DB_PORT = process.env.DB_PORT || 5432;
const DB_USER = process.env.DB_USER || "test";
const DB_PASS = process.env.DB_PASS || "test";
const DB_NAME = process.env.DB_NAME || "test";

export { PORT, PROTO, HOST, DB_TYPE, DB_HOST, DB_PORT, DB_USER, DB_PASS, DB_NAME };
