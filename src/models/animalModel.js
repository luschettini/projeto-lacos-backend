const pool = require('../config/database');

class Animal {
    static async findAll(filters = {}) {
        try {
            console.log('🔍 Tentando buscar todos os animais...');
            
            let query = `
                SELECT a.*, u.name as owner_name, u.phone as owner_phone, u.city as owner_city 
                FROM animals a 
                JOIN users u ON a.user_id = u.id 
                WHERE a.is_available = true
            `;
            
            const values = [];
            let paramCount = 1;
            
            // Aplicar filtros
            if (filters.species) {
                query += ` AND a.species = $${paramCount}`;
                values.push(filters.species);
                paramCount++;
            }
            if (filters.size) {
                query += ` AND a.size = $${paramCount}`;
                values.push(filters.size);
                paramCount++;
            }
            if (filters.age_category) {
                query += ` AND a.age_category = $${paramCount}`;
                values.push(filters.age_category);
                paramCount++;
            }
            if (filters.gender) {
                query += ` AND a.gender = $${paramCount}`;
                values.push(filters.gender);
                paramCount++;
            }
            if (filters.city) {
                query += ` AND LOWER(u.city) LIKE LOWER($${paramCount})`;
                values.push(`%${filters.city}%`);
                paramCount++;
            }
            
            query += ` ORDER BY a.created_at DESC`;
            
            const result = await pool.query(query, values);
            console.log('✅ Animais encontrados:', result.rows.length);
            return result.rows;
        } catch (error) {
            console.error('❌ Erro ao buscar animais:', error.message);
            throw error;
        }
    }

    static async findById(id) {
        try {
            const result = await pool.query(`
                SELECT a.*, u.name as owner_name, u.phone as owner_phone, 
                       u.email as owner_email, u.city as owner_city, u.bio as owner_bio 
                FROM animals a 
                JOIN users u ON a.user_id = u.id 
                WHERE a.id = $1
            `, [id]);
            return result.rows[0];
        } catch (error) {
            throw error;
        }
    }

    static async findFeatured() {
        try {
            const result = await pool.query(`
                SELECT a.*, u.name as owner_name, u.city as owner_city 
                FROM animals a 
                JOIN users u ON a.user_id = u.id 
                WHERE a.is_available = true 
                ORDER BY a.created_at DESC 
                LIMIT 6
            `);
            return result.rows;
        } catch (error) {
            throw error;
        }
    }

    static async findByUserId(userId) {
        try {
            const result = await pool.query(
                'SELECT * FROM animals WHERE user_id = $1 ORDER BY created_at DESC',
                [userId]
            );
            return result.rows;
        } catch (error) {
            throw error;
        }
    }

    static async create(name, species, breed, age_category, size, gender, description, medical_history, personality, is_vaccinated, is_neutered, rescue_story, special_needs, photo, user_id) {
        try {
            const query = `
                INSERT INTO animals (name, species, breed, age_category, size, gender, description, medical_history, personality, is_vaccinated, is_neutered, rescue_story, special_needs, photo_url, user_id)
                VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15)
                RETURNING *
            `;
            const result = await pool.query(
                query,
                [name, species, breed || 'SRD', age_category, size, gender, description || null, 
                 medical_history || null, personality || null, is_vaccinated || false, 
                 is_neutered || false, rescue_story || null, special_needs || null, photo, user_id]
            );
            return result.rows[0];
        } catch (error) {
            throw error;
        }
    }

    static async update(id, name, species, breed, age_category, size, gender, description, medical_history, personality, is_vaccinated, is_neutered, rescue_story, special_needs, photo) {
        try {
            const query = `
                UPDATE animals 
                SET name = $1, species = $2, breed = $3, age_category = $4, size = $5, 
                    gender = $6, description = $7, medical_history = $8, personality = $9, 
                    is_vaccinated = $10, is_neutered = $11, rescue_story = $12, 
                    special_needs = $13, photo_url = $14
                WHERE id = $15
                RETURNING *
            `;
            const result = await pool.query(
                query,
                [name, species, breed, age_category, size, gender, description, medical_history, personality, is_vaccinated, is_neutered, rescue_story, special_needs, photo, id]
            );
            return result.rows[0];
        } catch (error) {
            throw error;
        }
    }

    static async delete(id) {
        try {
            const result = await pool.query('DELETE FROM animals WHERE id = $1 RETURNING *', [id]);
            return result.rows[0];
        } catch (error) {
            throw error;
        }
    }

    static async markAsAdopted(id) {
        try {
            const result = await pool.query(
                'UPDATE animals SET is_available = false, updated_at = CURRENT_TIMESTAMP WHERE id = $1 RETURNING *',
                [id]
            );
            return result.rows[0];
        } catch (error) {
            throw error;
        }
    }
}

module.exports = Animal;