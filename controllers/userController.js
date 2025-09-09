const userModel = require("../models/userModel");

const getAllUsers = async (req, res) => {
    try {
        const { type } = req.query;
        const users = await userModel.getUsers(type);
        res.json(users);
    } catch (error) {
        console.error("Erro ao buscar usuários:", error);
        res.status(500).json({ message: "Erro ao buscar usuários." });
    }
};

const getUser = async (req, res) => {
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
};

const updateUser = async (req, res) => {
    try {
        const { name, phone, address, city, state, bio } = req.body;
        const profile_image = req.file ? req.file.filename : undefined;
        
        // Verificar se o usuário está tentando atualizar seu próprio perfil
        if (req.user.id !== parseInt(req.params.id)) {
            return res.status(403).json({ message: "Você só pode atualizar seu próprio perfil." });
        }
        
        const userData = { name, phone, address, city, state, bio };
        if (profile_image) {
            userData.profile_image = profile_image;
        }
        
        const updatedUser = await userModel.updateUser(req.params.id, userData);
        if (!updatedUser) {
            return res.status(404).json({ message: "Usuário não encontrado." });
        }
        res.json(updatedUser);
    } catch (error) {
        console.error("Erro ao atualizar usuário:", error);
        res.status(500).json({ message: "Erro ao atualizar usuário." });
    }
};

const deleteUser = async (req, res) => {
    try {
        // Verificar se o usuário está tentando deletar seu próprio perfil
        if (req.user.id !== parseInt(req.params.id)) {
            return res.status(403).json({ message: "Você só pode deletar seu próprio perfil." });
        }
        
        const result = await userModel.deleteUser(req.params.id);
        res.json(result);
    } catch (error) {
        console.error("Erro ao deletar usuário:", error);
        res.status(500).json({ message: "Erro ao deletar usuário." });
    }
};

const getProtectors = async (req, res) => {
    try {
        const protectors = await userModel.getUsers('protetor');
        const ongs = await userModel.getUsers('ong');
        const allProtectors = [...protectors, ...ongs];
        res.json(allProtectors);
    } catch (error) {
        console.error("Erro ao buscar protetores:", error);
        res.status(500).json({ message: "Erro ao buscar protetores." });
    }
};

module.exports = { getAllUsers, getUser, updateUser, deleteUser, getProtectors };
