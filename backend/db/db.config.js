const env = process.env;

const config = {
  db: {
    host: env.DB_HOST || "localhost",
    port: env.DB_PORT || "5432",
    user: env.DB_USER || "postgres",
    password: env.DB_PASSWORD || "admin",
    database: env.DB_NAME || "news",
    max: 20,
    idleTimeoutMillis: 1000,
  },
  listPerPage: env.LIST_PER_PAGE || 20,
};

export default config;
