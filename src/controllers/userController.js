const User = require('../models/userModel');

// GET /api/users - Listar usuários
exports.getAll = async (req, res) => {
    try {
        const { type, city } = req.query;
        const filters = { type, city };
        
        const users = await User.findAll(filters);
        res.json(users);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Erro ao buscar usuários' });
    }
};

// GET /api/users/protectors - Listar protetores e ONGs
exports.getProtectors = async (req, res) => {
    try {
        const protectors = await User.findProtectors();
        res.json(protectors);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Erro ao buscar protetores' });
    }
};

// GET /api/users/:id - Buscar usuário por ID
exports.getById = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id);
        if (!user) return res.status(404).json({ error: 'Usuário não encontrado' });
        res.json(user);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Erro ao buscar usuário' });
    }
};

// POST /api/users - Criar usuário
exports.create = async (req, res) => {
    try {
        const { name, email, password, phone, type, address, city, state, bio } = req.body;
        
        if (!name || !email || !password || !type) {
            return res.status(400).json({ error: 'name, email, password e type são obrigatórios' });
        }

        // Verificar se email já existe
        const existingUser = await User.findByEmail(email);
        if (existingUser) {
            return res.status(400).json({ error: 'Email já está em uso' });
        }

        const profile_photo = req.file ? req.file.filename : null;

        const user = await User.create(name, email, password, phone, type, address, city, state, bio, profile_photo);
        res.status(201).json(user);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Erro ao criar usuário' });
    }
};

// PUT /api/users/:id - Atualizar usuário
exports.update = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, email, phone, type, address, city, state, bio } = req.body;

        const profile_photo = req.file ? req.file.filename : req.body.profile_photo;

        const user = await User.update(id, name, email, phone, type, address, city, state, bio, profile_photo);
        if (!user) return res.status(404).json({ error: 'Usuário não encontrado' });
        res.json(user);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Erro ao atualizar usuário' });
    }
};

// DELETE /api/users/:id - Remover usuário
exports.remove = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.delete(id);
        if (!user) return res.status(404).json({ error: 'Usuário não encontrado' });
        res.json({ message: 'Usuário removido com sucesso' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Erro ao remover usuário' });
    }
};
