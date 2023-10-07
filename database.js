const { Pool } = require("pg");
const client = new Pool({
  host: "localhost",
  port: 5432,
  database: "HW_9",
  user: "postgres",
  password: "ilzam3003",
});

module.exports = client;
