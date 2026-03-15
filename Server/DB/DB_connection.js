const psql = require("pg-promise")();

const db = psql( process.env.POSTGRESQL_URL );

module.exports = db;

/* const db = psql({
  host: "localhost",
  port: 5432,
  database: "ChatApp",
  user: "postgres",
  password: "0313",
  connect_timeout: 10,
}); */