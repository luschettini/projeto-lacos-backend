const { Pool } = require("pg");
require("dotenv").config();

const pool = new Pool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
});

pool.on("connect", () => {
    console.log("Conectado ao banco de dados PostgreSQL");
});

pool.on("error", (err) => {
    console.error("Erro na conexão com o banco de dados:", err);
});

module.exports = pool;
