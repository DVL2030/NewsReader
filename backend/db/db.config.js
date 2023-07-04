const env = process.env;

const config = {
  db: {
    host: env.DB_HOST || "http://localhost",
    port: env.DB_PORT || "5432",
    user: env.DB_USER || "postgres",
    password: env.DB_PASSWORD || "admin",
    database: env.DB_NAME || "news",
  },
  listPerPage: env.LIST_PER_PAGE || 20,
};

export default config;
