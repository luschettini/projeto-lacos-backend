const Animal = require('../models/animalModel');

// GET /api/animals - Listar todos os animais
exports.getAll = async (req, res) => {
    try {
        const { species, size, age_category, city, gender } = req.query;
        const filters = { species, size, age_category, city, gender };
        
        const animals = await Animal.findAll(filters);
        res.json(animals);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Erro ao buscar animais' });
    }
};

// GET /api/animals/featured - Animais em destaque
exports.getFeatured = async (req, res) => {
    try {
        const animals = await Animal.findFeatured();
        res.json(animals);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Erro ao buscar animais em destaque' });
    }
};

// GET /api/animals/:id - Buscar animal por ID
exports.getById = async (req, res) => {
    try {
        const { id } = req.params;
        const animal = await Animal.findById(id);
        if (!animal) return res.status(404).json({ error: 'Animal não encontrado' });
        res.json(animal);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Erro ao buscar animal' });
    }
};

// GET /api/animals/user/:userId - Buscar animais por usuário
exports.getByUserId = async (req, res) => {
    try {
        const { userId } = req.params;
        const animals = await Animal.findByUserId(userId);
        res.json(animals);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Erro ao buscar animais do usuário' });
    }
};

// POST /api/animals - Criar animal
exports.create = async (req, res) => {
    try {
        const { 
            name, species, breed, age_category, size, gender, description,
            medical_history, personality, is_vaccinated, is_neutered,
            rescue_story, special_needs, user_id 
        } = req.body;
        
        // ✅ CORREÇÃO: user_id NÃO é obrigatório (animais de rua podem não ter)
        if (!name || !species || !age_category || !size || !gender) {
            return res.status(400).json({ error: 'name, species, age_category, size e gender são obrigatórios' });
        }

        // ✅ VALIDAÇÃO DAS OPÇÕES PERMITIDAS
        const validSpecies = ['cachorro', 'gato', 'outro'];
        const validAgeCategories = ['filhote', 'jovem', 'adulto', 'idoso'];
        const validSizes = ['pequeno', 'medio', 'grande'];
        const validGenders = ['macho', 'femea'];

        if (!validSpecies.includes(species)) {
            return res.status(400).json({ error: 'species deve ser: cachorro, gato ou outro' });
        }

        if (!validAgeCategories.includes(age_category)) {
            return res.status(400).json({ error: 'age_category deve ser: filhote, jovem, adulto ou idoso' });
        }

        if (!validSizes.includes(size)) {
            return res.status(400).json({ error: 'size deve ser: pequeno, medio ou grande' });
        }

        if (!validGenders.includes(gender)) {
            return res.status(400).json({ error: 'gender deve ser: macho ou femea' });
        }

        const photo = req.file ? req.file.filename : null;

        const animal = await Animal.create(
            name, species, breed || 'SRD', age_category, size, gender, description,
            medical_history, personality, is_vaccinated || false, is_neutered || false,
            rescue_story, special_needs, photo, user_id || null // ✅ user_id pode ser null
        );
        
        res.status(201).json(animal);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Erro ao criar animal' });
    }
};

// PUT /api/animals/:id - Atualizar animal
exports.update = async (req, res) => {
    try {
        const { id } = req.params;
        const { 
            name, species, breed, age_category, size, gender, description,
            medical_history, personality, is_vaccinated, is_neutered,
            rescue_story, special_needs 
        } = req.body;

        const photo = req.file ? req.file.filename : req.body.photo;

        const animal = await Animal.update(
            id, name, species, breed, age_category, size, gender, description,
            medical_history, personality, is_vaccinated, is_neutered,
            rescue_story, special_needs, photo
        );
        
        if (!animal) return res.status(404).json({ error: 'Animal não encontrado' });
        res.json(animal);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Erro ao atualizar animal' });
    }
};

// DELETE /api/animals/:id - Remover animal
exports.remove = async (req, res) => {
    try {
        const { id } = req.params;
        const animal = await Animal.delete(id);
        if (!animal) return res.status(404).json({ error: 'Animal não encontrado' });
        res.json({ message: 'Animal removido com sucesso' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Erro ao remover animal' });
    }
};

// PATCH /api/animals/:id/adopt - Marcar como adotado
exports.markAsAdopted = async (req, res) => {
    try {
        const { id } = req.params;
        const animal = await Animal.markAsAdopted(id);
        if (!animal) return res.status(404).json({ error: 'Animal não encontrado' });
        res.json({ message: 'Animal marcado como adotado', animal });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Erro ao marcar animal como adotado' });
    }
};
