const pool = require("../config/database");

const getTestimonials = async (approved = true) => {
    const result = await pool.query(
        `SELECT t.*, users.name AS adopter_name 
         FROM testimonials t
         LEFT JOIN users ON t.adopter_id = users.id
         WHERE t.is_approved = $1
         ORDER BY t.created_at DESC`, 
        [approved]
    );
    return result.rows;
};

const getTestimonialById = async (id) => {
    const result = await pool.query(
        `SELECT t.*, users.name AS adopter_name, users.email AS adopter_email
         FROM testimonials t
         LEFT JOIN users ON t.adopter_id = users.id
         WHERE t.id = $1`, 
        [id]
    );
    return result.rows[0];
};

const getTestimonialsByUserId = async (userId) => {
    const result = await pool.query(
        `SELECT t.*, users.name AS adopter_name 
         FROM testimonials t
         LEFT JOIN users ON t.adopter_id = users.id
         WHERE t.adopter_id = $1
         ORDER BY t.created_at DESC`, 
        [userId]
    );
    return result.rows;
};

const createTestimonial = async (testimonialData) => {
    const { adopter_id, animal_name, message, photo_url } = testimonialData;
    
    const result = await pool.query(
        `INSERT INTO testimonials (adopter_id, animal_name, message, photo_url) 
         VALUES ($1, $2, $3, $4) RETURNING *`,
        [adopter_id, animal_name, message, photo_url]
    );
    return result.rows[0];
};

const updateTestimonialApproval = async (id, isApproved) => {
    const result = await pool.query(
        `UPDATE testimonials SET is_approved = $1 
         WHERE id = $2 RETURNING *`,
        [isApproved, id]
    );
    return result.rows[0];
};

const deleteTestimonial = async (id) => {
    const result = await pool.query("DELETE FROM testimonials WHERE id = $1 RETURNING *", [id]);
    
    if (result.rowCount === 0) {
        return { error: "Depoimento não encontrado." };
    }
    
    return { message: "Depoimento deletado com sucesso." };
};

module.exports = { 
    getTestimonials, 
    getTestimonialById, 
    getTestimonialsByUserId, 
    createTestimonial, 
    updateTestimonialApproval, 
    deleteTestimonial 
};
