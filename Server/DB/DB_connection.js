const psql = require("pg-promise")();
// const db = psql("postgresql://postgres:0313@localhost:5432/postgres");

const db = psql({
//   host: "localhost",
//   port: 5432,
//   database: "chatapp",
//   user: "postgres",
//   password: "password",

host:"localhost", port:5432, database:"ChatApp", user:"postgres", password:"0313", connect_timeout:10,
});

module.exports =  db;