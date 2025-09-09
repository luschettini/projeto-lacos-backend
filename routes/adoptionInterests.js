const express = require("express");
const router = express.Router();
const adoptionInterestModel = require("../models/adoptionInterestModel");

// Rota para listar todos os interesses
router.get("/", async (req, res) => {
    try {
        const { user_id, user_type } = req.query;
        if (user_id && user_type) {
            const interests = await adoptionInterestModel.getAdoptionInterests(user_id, user_type);
            res.json(interests);
        } else {
            res.status(400).json({ message: "user_id e user_type são obrigatórios." });
        }
    } catch (error) {
        console.error("Erro ao buscar interesses:", error);
        res.status(500).json({ message: "Erro ao buscar interesses de adoção." });
    }
});

// Rota para obter interesse por ID
router.get("/:id", async (req, res) => {
    try {
        const interest = await adoptionInterestModel.getAdoptionInterestById(req.params.id);
        if (!interest) {
            return res.status(404).json({ message: "Interesse de adoção não encontrado." });
        }
        res.json(interest);
    } catch (error) {
        console.error("Erro ao buscar interesse:", error);
        res.status(500).json({ message: "Erro ao buscar interesse de adoção." });
    }
});

// Rota para listar interesses de um animal específico
router.get("/animal/:animalId", async (req, res) => {
    try {
        const interests = await adoptionInterestModel.getInterestsByAnimalId(req.params.animalId);
        res.json(interests);
    } catch (error) {
        console.error("Erro ao buscar interesses do animal:", error);
        res.status(500).json({ message: "Erro ao buscar interesses do animal." });
    }
});

// Rota para criar interesse em adoção (simplificada)
router.post("/", async (req, res) => {
    try {
        const { animal_id, adopter_id, message, contact_preference } = req.body;
        
        const interestData = {
            animal_id,
            adopter_id,
            message,
            contact_preference: contact_preference || 'email'
        };
        
        const newInterest = await adoptionInterestModel.createAdoptionInterest(interestData);
        
        if (newInterest.error) {
            return res.status(400).json({ message: newInterest.error });
        }
        
        res.status(201).json(newInterest);
    } catch (error) {
        console.error("Erro ao criar interesse:", error);
        res.status(500).json({ message: "Erro ao manifestar interesse de adoção." });
    }
});

// Rota para atualizar status do interesse
router.patch("/:id/status", async (req, res) => {
    try {
        const { status } = req.body;
        const validStatuses = ['pendente', 'aprovado', 'rejeitado', 'concluido'];
        
        if (!validStatuses.includes(status)) {
            return res.status(400).json({ message: "Status inválido." });
        }
        
        const updatedInterest = await adoptionInterestModel.updateAdoptionInterestStatus(req.params.id, status);
        res.json(updatedInterest);
    } catch (error) {
        console.error("Erro ao atualizar status:", error);
        res.status(500).json({ message: "Erro ao atualizar status do interesse." });
    }
});

module.exports = router;
