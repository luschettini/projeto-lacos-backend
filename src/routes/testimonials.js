const express = require('express');
const router = express.Router();
const pool = require('../config/database');

// GET /api/testimonials - Buscar todos os depoimentos (apenas de animais com responsável)
router.get('/testimonials', async (req, res) => {
    try {
        const query = `
            SELECT 
                t.id, 
                t.content, 
                t.created_at, 
                t.rating, 
                t.user_id, 
                u.name AS user_name, 
                u.email AS user_email, 
                u.city AS user_city, 
                u.state AS user_state, 
                u.phone AS user_phone, 
                t.animal_id, 
                a.name AS animal_name, 
                a.species AS animal_species, 
                a.breed AS animal_breed, 
                a.photo_url AS animal_photo
            FROM testimonials t
            JOIN users u ON t.user_id = u.id
            JOIN animals a ON t.animal_id = a.id
            WHERE t.is_approved = true
        `;

        const result = await pool.query(query);

        res.json(result.rows);
    } catch (error) {
        console.error('Erro ao buscar depoimentos:', error.message);
        res.status(500).json({ error: 'Erro ao buscar depoimentos' });
    }
});

module.exports = router;
