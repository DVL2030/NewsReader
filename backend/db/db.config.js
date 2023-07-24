import dotenv from "dotenv";
dotenv.config();

const config = {
  db: {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    ssl: true,
    max: 20,
    idleTimeoutMillis: 1000,
  },
  listPerPage: process.env.LIST_PER_PAGE || 20,
};

export default config;
