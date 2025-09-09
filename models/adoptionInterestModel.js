const pool = require("../config/database");

const getAdoptionInterests = async (userId, userType) => {
    let query, params;
    
    if (userType === 'adotante') {
        // Se for adotante, busca os interesses que ele manifestou
        query = `
            SELECT ai.*, animals.name AS animal_name, animals.photos, animals.species,
                   users.name AS owner_name, users.phone AS owner_phone, users.email AS owner_email
            FROM adoption_interests ai
            LEFT JOIN animals ON ai.animal_id = animals.id
            LEFT JOIN users ON animals.user_id = users.id
            WHERE ai.adopter_id = $1
            ORDER BY ai.created_at DESC
        `;
        params = [userId];
    } else {
        // Se for ONG/protetor, busca os interesses nos seus animais
        query = `
            SELECT ai.*, animals.name AS animal_name, animals.photos, animals.species,
                   users.name AS adopter_name, users.phone AS adopter_phone, users.email AS adopter_email
            FROM adoption_interests ai
            LEFT JOIN animals ON ai.animal_id = animals.id
            LEFT JOIN users ON ai.adopter_id = users.id
            WHERE animals.user_id = $1
            ORDER BY ai.created_at DESC
        `;
        params = [userId];
    }
    
    const result = await pool.query(query, params);
    return result.rows;
};

const getAdoptionInterestById = async (id) => {
    const result = await pool.query(
        `SELECT ai.*, animals.name AS animal_name, animals.user_id AS owner_id,
                adopter.name AS adopter_name, adopter.email AS adopter_email, adopter.phone AS adopter_phone,
                owner.name AS owner_name, owner.email AS owner_email, owner.phone AS owner_phone
         FROM adoption_interests ai
         LEFT JOIN animals ON ai.animal_id = animals.id
         LEFT JOIN users adopter ON ai.adopter_id = adopter.id
         LEFT JOIN users owner ON animals.user_id = owner.id
         WHERE ai.id = $1`, 
        [id]
    );
    return result.rows[0];
};

const createAdoptionInterest = async (interestData) => {
    const { animal_id, adopter_id, message, contact_preference } = interestData;
    
    // Verificar se já existe interesse deste adotante para este animal
    const existingInterest = await pool.query(
        "SELECT id FROM adoption_interests WHERE animal_id = $1 AND adopter_id = $2",
        [animal_id, adopter_id]
    );
    
    if (existingInterest.rows.length > 0) {
        return { error: "Você já manifestou interesse neste animal." };
    }
    
    const result = await pool.query(
        `INSERT INTO adoption_interests (animal_id, adopter_id, message, contact_preference) 
         VALUES ($1, $2, $3, $4) RETURNING *`,
        [animal_id, adopter_id, message, contact_preference]
    );
    return result.rows[0];
};

const updateAdoptionInterestStatus = async (id, status) => {
    const result = await pool.query(
        `UPDATE adoption_interests SET status = $1, updated_at = CURRENT_TIMESTAMP 
         WHERE id = $2 RETURNING *`,
        [status, id]
    );
    return result.rows[0];
};

const deleteAdoptionInterest = async (id) => {
    const result = await pool.query("DELETE FROM adoption_interests WHERE id = $1 RETURNING *", [id]);
    
    if (result.rowCount === 0) {
        return { error: "Interesse de adoção não encontrado." };
    }
    
    return { message: "Interesse de adoção deletado com sucesso." };
};

const getInterestsByAnimalId = async (animalId) => {
    const result = await pool.query(
        `SELECT ai.*, users.name AS adopter_name, users.email AS adopter_email, users.phone AS adopter_phone
         FROM adoption_interests ai
         LEFT JOIN users ON ai.adopter_id = users.id
         WHERE ai.animal_id = $1
         ORDER BY ai.created_at DESC`, 
        [animalId]
    );
    return result.rows;
};

module.exports = { 
    getAdoptionInterests, 
    getAdoptionInterestById, 
    createAdoptionInterest, 
    updateAdoptionInterestStatus, 
    deleteAdoptionInterest, 
    getInterestsByAnimalId 
};
