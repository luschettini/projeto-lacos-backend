const { Pool } = require('pg');
require('dotenv').config();

console.log('🔧 Configurando conexão com banco de dados...');
console.log('📊 Configurações:', {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT
});

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD, 
    port: process.env.DB_PORT,
});

module.exports = pool;