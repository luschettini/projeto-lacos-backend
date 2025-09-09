const pool = require("../config/database");
const bcrypt = require("bcryptjs");

const getUsers = async (type) => {
    let query = `
        SELECT id, name, email, phone, type, address, city, state, bio, profile_image, created_at 
        FROM users
    `;
    const params = [];
    
    if (type) {
        query += " WHERE type = $1";
        params.push(type);
    }
    
    query += " ORDER BY created_at DESC";
    
    const result = await pool.query(query, params);
    return result.rows;
};

const getUserById = async (id) => {
    const result = await pool.query(
        `SELECT id, name, email, phone, type, address, city, state, bio, profile_image, created_at 
         FROM users WHERE id = $1`, 
        [id]
    );
    return result.rows[0];
};

const getUserByEmail = async (email) => {
    const result = await pool.query(
        "SELECT * FROM users WHERE email = $1", 
        [email]
    );
    return result.rows[0];
};

const createUser = async (userData) => {
    const { name, email, password, phone, type, address, city, state, bio, profile_image } = userData;
    
    // Hash da senha
    const hashedPassword = await bcrypt.hash(password, 10);
    
    const result = await pool.query(
        `INSERT INTO users (name, email, password, phone, type, address, city, state, bio, profile_image) 
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING id, name, email, phone, type, address, city, state, bio, profile_image, created_at`,
        [name, email, hashedPassword, phone, type, address, city, state, bio, profile_image]
    );
    return result.rows[0];
};

const updateUser = async (id, userData) => {
    const { name, phone, address, city, state, bio, profile_image } = userData;
    
    const result = await pool.query(
        `UPDATE users SET name = $1, phone = $2, address = $3, city = $4, state = $5, bio = $6, 
         profile_image = $7, updated_at = CURRENT_TIMESTAMP 
         WHERE id = $8 RETURNING id, name, email, phone, type, address, city, state, bio, profile_image, updated_at`,
        [name, phone, address, city, state, bio, profile_image, id]
    );
    return result.rows[0];
};

const deleteUser = async (id) => {
    const result = await pool.query("DELETE FROM users WHERE id = $1 RETURNING *", [id]);
    
    if (result.rowCount === 0) {
        return { error: "Usuário não encontrado." };
    }
    
    return { message: "Usuário deletado com sucesso." };
};

const validatePassword = async (password, hashedPassword) => {
    return await bcrypt.compare(password, hashedPassword);
};

module.exports = { 
    getUsers, 
    getUserById, 
    getUserByEmail, 
    createUser, 
    updateUser, 
    deleteUser, 
    validatePassword 
};
