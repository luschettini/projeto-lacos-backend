const pool = require("../config/database");

const getAnimals = async (filters = {}) => {
    let query = `
        SELECT animals.*, users.name AS owner_name, users.type AS owner_type, 
               users.city AS owner_city, users.phone AS owner_phone
        FROM animals 
        LEFT JOIN users ON animals.user_id = users.id 
        WHERE animals.is_available = true
    `;
    const params = [];
    let paramCount = 0;
    
    // Aplicar filtros
    if (filters.species) {
        paramCount++;
        query += ` AND animals.species = $${paramCount}`;
        params.push(filters.species);
    }
    
    if (filters.size) {
        paramCount++;
        query += ` AND animals.size = $${paramCount}`;
        params.push(filters.size);
    }
    
    if (filters.age_category) {
        paramCount++;
        query += ` AND animals.age_category = $${paramCount}`;
        params.push(filters.age_category);
    }
    
    if (filters.city) {
        paramCount++;
        query += ` AND users.city ILIKE $${paramCount}`;
        params.push(`%${filters.city}%`);
    }
    
    if (filters.gender) {
        paramCount++;
        query += ` AND animals.gender = $${paramCount}`;
        params.push(filters.gender);
    }
    
    query += " ORDER BY animals.created_at DESC";
    
    const result = await pool.query(query, params);
    return result.rows;
};

const getAnimalById = async (id) => {
    const result = await pool.query(
        `SELECT animals.*, users.name AS owner_name, users.type AS owner_type, 
                users.city AS owner_city, users.phone AS owner_phone, users.email AS owner_email,
                users.bio AS owner_bio
         FROM animals 
         LEFT JOIN users ON animals.user_id = users.id 
         WHERE animals.id = $1`, 
        [id]
    );
    return result.rows[0];
};

const getAnimalsByUserId = async (userId) => {
    const result = await pool.query(
        `SELECT animals.*, users.name AS owner_name 
         FROM animals 
         LEFT JOIN users ON animals.user_id = users.id 
         WHERE animals.user_id = $1 
         ORDER BY animals.created_at DESC`, 
        [userId]
    );
    return result.rows;
};

const createAnimal = async (animalData) => {
    const { 
        name, species, breed, age_category, size, gender, description, 
        medical_history, personality, photos, is_vaccinated, is_neutered, 
        rescue_story, special_needs, user_id 
    } = animalData;
    
    const result = await pool.query(
        `INSERT INTO animals 
         (name, species, breed, age_category, size, gender, description, medical_history, 
          personality, photos, is_vaccinated, is_neutered, rescue_story, special_needs, user_id) 
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15) RETURNING *`,
        [name, species, breed, age_category, size, gender, description, medical_history, 
         personality, photos, is_vaccinated, is_neutered, rescue_story, special_needs, user_id]
    );
    return result.rows[0];
};

const updateAnimal = async (id, animalData) => {
    const { 
        name, species, breed, age_category, size, gender, description, 
        medical_history, personality, photos, is_vaccinated, is_neutered, 
        is_available, rescue_story, special_needs 
    } = animalData;
    
    const result = await pool.query(
        `UPDATE animals SET 
         name = $1, species = $2, breed = $3, age_category = $4, size = $5, gender = $6, 
         description = $7, medical_history = $8, personality = $9, photos = $10, 
         is_vaccinated = $11, is_neutered = $12, is_available = $13, rescue_story = $14, 
         special_needs = $15, updated_at = CURRENT_TIMESTAMP 
         WHERE id = $16 RETURNING *`,
        [name, species, breed, age_category, size, gender, description, medical_history, 
         personality, photos, is_vaccinated, is_neutered, is_available, rescue_story, special_needs, id]
    );
    return result.rows[0];
};

const deleteAnimal = async (id) => {
    const result = await pool.query("DELETE FROM animals WHERE id = $1 RETURNING *", [id]);
    
    if (result.rowCount === 0) {
        return { error: "Animal não encontrado." };
    }
    
    return { message: "Animal deletado com sucesso." };
};

const updateAvailabilityStatus = async (id, isAvailable) => {
    const result = await pool.query(
        "UPDATE animals SET is_available = $1, updated_at = CURRENT_TIMESTAMP WHERE id = $2 RETURNING *",
        [isAvailable, id]
    );
    return result.rows[0];
};

module.exports = { 
    getAnimals, 
    getAnimalById, 
    getAnimalsByUserId, 
    createAnimal, 
    updateAnimal, 
    deleteAnimal, 
    updateAvailabilityStatus 
};
