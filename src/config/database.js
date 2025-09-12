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
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 7777,  
    database: process.env.DB_NAME || 'lacos_de_pata',
    user: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD,
    ssl: false
});

module.exports = pool;