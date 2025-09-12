const pool = require('../config/database');

class User {
    static async findAll(filters = {}) {
        try {
            console.log('🔍 Tentando buscar todos os usuários...');
            
            let query = 'SELECT * FROM users WHERE 1=1';
            const values = [];
            let paramCount = 1;
            
            // Aplicar filtros
            if (filters.type) {
                query += ` AND type = $${paramCount}`;
                values.push(filters.type);
                paramCount++;
            }
            if (filters.city) {
                query += ` AND LOWER(city) LIKE LOWER($${paramCount})`;
                values.push(`%${filters.city}%`);
                paramCount++;
            }
            
            query += ' ORDER BY created_at DESC';
            
            const result = await pool.query(query, values);
            console.log('✅ Usuários encontrados:', result.rows.length);
            return result.rows;
        } catch (error) {
            console.error('❌ Erro ao buscar usuários:', error.message);
            throw error;
        }
    }

    static async findById(id) {
        try {
            const result = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
            return result.rows[0];
        } catch (error) {
            throw error;
        }
    }

    static async findProtectors() {
        try {
            const result = await pool.query(
                "SELECT * FROM users WHERE type IN ('protetor', 'ong') ORDER BY created_at DESC"
            );
            return result.rows;
        } catch (error) {
            throw error;
        }
    }

    static async findByEmail(email) {
        try {
            const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
            return result.rows[0];
        } catch (error) {
            throw error;
        }
    }

    static async create(name, email, password, phone, type, address, city, state, bio, profile_photo) {
        try {
            const query = `
                INSERT INTO users (name, email, password, phone, type, address, city, state, bio, photo_url)
                VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
                RETURNING *
            `;
            const result = await pool.query(
                query,
                [name, email, password, phone || null, type, address || null, city || null, state || null, bio || null, profile_photo || null]
            );
            return result.rows[0];
        } catch (error) {
            throw error;
        }
    }

    static async update(id, name, email, phone, type, address, city, state, bio, profile_photo) {
        try {
            const query = `
                UPDATE users 
                SET name = $1, email = $2, password = $3, phone = $4, type = $5, 
                    address = $6, city = $7, state = $8, bio = $9, photo_url = $10
                WHERE id = $11
                RETURNING *
            `;
            const result = await pool.query(
                query,
                [name, email, phone, type, address, city, state, bio, profile_photo, id]
            );
            return result.rows[0];
        } catch (error) {
            throw error;
        }
    }

    static async delete(id) {
        try {
            const result = await pool.query('DELETE FROM users WHERE id = $1 RETURNING *', [id]);
            return result.rows[0];
        } catch (error) {
            throw error;
        }
    }
}

module.exports = User;
