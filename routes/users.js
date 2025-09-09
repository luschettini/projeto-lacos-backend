const express = require("express");
const router = express.Router();
const userModel = require("../models/userModel");
const upload = require("../middleware/upload");

// ===== CRUD COMPLETO PARA USUÁRIOS =====

// CREATE - Criar usuário
router.post("/", upload.single("profile_image"), async (req, res) => {
    try {
        const { name, email, password, phone, type, address, city, state, bio } = req.body;
        
        // Verificar se o email já existe
        const existingUser = await userModel.getUserByEmail(email);
        if (existingUser) {
            return res.status(400).json({ message: "Email já está em uso." });
        }
        
        const validTypes = ['ong', 'protetor', 'adotante'];
        if (!validTypes.includes(type)) {
            return res.status(400).json({ message: "Tipo de usuário inválido." });
        }
        
        const profile_image = req.file ? req.file.filename : null;
        
        const newUser = await userModel.createUser({
            name, email, password, phone, type, address, city, state, bio, profile_image
        });
        
        res.status(201).json({
            message: "Usuário criado com sucesso!",
            user: newUser
        });
    } catch (error) {
        console.error("Erro ao criar usuário:", error);
        res.status(500).json({ message: "Erro interno do servidor." });
    }
});

// READ - Listar todos os usuários
router.get("/", async (req, res) => {
    try {
        const { type } = req.query;
        const users = await userModel.getUsers(type);
        res.json({
            total: users.length,
            users: users
        });
    } catch (error) {
        console.error("Erro ao buscar usuários:", error);
        res.status(500).json({ message: "Erro ao buscar usuários." });
    }
});

// READ - Obter usuário por ID (Para página "Sobre Mim" específica)
router.get("/:id", async (req, res) => {
    try {
        const user = await userModel.getUserById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: "Usuário não encontrado." });
        }
        res.json(user);
    } catch (error) {
        console.error("Erro ao buscar usuário:", error);
        res.status(500).json({ message: "Erro ao buscar usuário." });
    }
});

// UPDATE - Atualizar usuário
router.put("/:id", upload.single("profile_image"), async (req, res) => {
    try {
        const { name, phone, address, city, state, bio } = req.body;
        
        // Verificar se o usuário existe
        const existingUser = await userModel.getUserById(req.params.id);
        if (!existingUser) {
            return res.status(404).json({ message: "Usuário não encontrado." });
        }
        
        const userData = { name, phone, address, city, state, bio };
        if (req.file) {
            userData.profile_image = req.file.filename;
        }
        
        const updatedUser = await userModel.updateUser(req.params.id, userData);
        res.json({
            message: "Usuário atualizado com sucesso!",
            user: updatedUser
        });
    } catch (error) {
        console.error("Erro ao atualizar usuário:", error);
        res.status(500).json({ message: "Erro ao atualizar usuário." });
    }
});

// DELETE - Deletar usuário
router.delete("/:id", async (req, res) => {
    try {
        const user = await userModel.getUserById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: "Usuário não encontrado." });
        }
        
        const result = await userModel.deleteUser(req.params.id);
        res.json(result);
    } catch (error) {
        console.error("Erro ao deletar usuário:", error);
        res.status(500).json({ message: "Erro ao deletar usuário." });
    }
});

// ===== ROTAS EXTRAS =====

// Rota para listar protetores e ONGs (Para página "Sobre Mim")
router.get("/protectors/all", async (req, res) => {
    try {
        const protectors = await userModel.getUsers('protetor');
        const ongs = await userModel.getUsers('ong');
        const allProtectors = [...protectors, ...ongs];
        res.json({
            message: "Lista de protetores e ONGs",
            total: allProtectors.length,
            protectors: allProtectors
        });
    } catch (error) {
        console.error("Erro ao buscar protetores:", error);
        res.status(500).json({ message: "Erro ao buscar protetores." });
    }
});

// Rota simplificada para compatibilidade
router.get("/protectors", async (req, res) => {
    try {
        const protectors = await userModel.getUsers('protetor');
        const ongs = await userModel.getUsers('ong');
        const allProtectors = [...protectors, ...ongs];
        res.json(allProtectors);
    } catch (error) {
        console.error("Erro ao buscar protetores:", error);
        res.status(500).json({ message: "Erro ao buscar protetores." });
    }
});

module.exports = router;
