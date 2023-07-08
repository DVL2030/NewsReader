import pkg from "pg";
import config from "./db.config.js";

const { Pool } = pkg;
const pool = new Pool(config.db);

export const query = async (query, params = []) => {
  const { rows, fields } = await pool.query(query, params);
  return rows;
};

export const getClient = () => {
  return pool.connect();
};
