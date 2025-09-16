const express = require('express');
const router = express.Router();
const pool = require('../config/database');

// GET /api/testimonials - Buscar todos os depoimentos (apenas de animais com responsável)
router.get('/', async (req, res) => {
  try {
    const query = `
      SELECT 
        t.*,
        u.name as user_name,
        u.email as user_email,
        u.city as user_city,
        u.state as user_state,
        u.phone as user_phone,
        a.name as animal_name,
        a.species as animal_species,
        a.breed as animal_breed,
        a.photo_url as animal_photo
      FROM testimonials t
      LEFT JOIN users u ON t.user_id = u.id
      LEFT JOIN animals a ON t.animal_id = a.id
      WHERE t.is_approved = true AND a.user_id IS NOT NULL
      ORDER BY t.created_at DESC
    `;
    const result = await pool.query(query);
    res.json(result.rows);
  } catch (error) {
    console.error('Erro ao buscar depoimentos:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

// Outras rotas de depoimentos podem ser adicionadas aqui...

module.exports = router;
