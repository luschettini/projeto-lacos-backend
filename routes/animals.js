const express = require("express");
const router = express.Router();
const animalModel = require("../models/animalModel");
const upload = require("../middleware/upload");

// ===== CRUD COMPLETO PARA ANIMAIS =====

// CREATE - Criar animal
router.post("/", upload.array("photos", 5), async (req, res) => {
    try {
        const {
            name, species, breed, age_category, size, gender, description,
            medical_history, personality, is_vaccinated, is_neutered,
            rescue_story, special_needs, user_id
        } = req.body;
        
        // Processar fotos enviadas
        const photos = req.files ? req.files.map(file => file.filename) : [];
        
        const animalData = {
            name, species, breed, age_category, size, gender, description,
            medical_history, personality, photos, is_vaccinated: is_vaccinated === 'true',
            is_neutered: is_neutered === 'true', rescue_story, special_needs,
            user_id
        };
        
        const newAnimal = await animalModel.createAnimal(animalData);
        res.status(201).json({
            message: "Animal criado com sucesso!",
            animal: newAnimal
        });
    } catch (error) {
        console.error("Erro ao criar animal:", error);
        res.status(500).json({ message: "Erro ao cadastrar animal." });
    }
});

// READ - Listar todos os animais (Para página "Home" e "Listagem")
router.get("/", async (req, res) => {
    try {
        const { species, size, age_category, city, gender } = req.query;
        const filters = {};
        
        if (species) filters.species = species;
        if (size) filters.size = size;
        if (age_category) filters.age_category = age_category;
        if (city) filters.city = city;
        if (gender) filters.gender = gender;
        
        const animals = await animalModel.getAnimals(filters);
        res.json({
            total: animals.length,
            animals: animals
        });
    } catch (error) {
        console.error("Erro ao buscar animais:", error);
        res.status(500).json({ message: "Erro ao buscar animais." });
    }
});

// READ - Obter animal por ID (Para página "Detalhes")
router.get("/:id", async (req, res) => {
    try {
        const animal = await animalModel.getAnimalById(req.params.id);
        if (!animal) {
            return res.status(404).json({ message: "Animal não encontrado." });
        }
        res.json(animal);
    } catch (error) {
        console.error("Erro ao buscar animal:", error);
        res.status(500).json({ message: "Erro ao buscar animal." });
    }
});

// UPDATE - Atualizar animal
router.put("/:id", upload.array("photos", 5), async (req, res) => {
    try {
        const {
            name, species, breed, age_category, size, gender, description,
            medical_history, personality, is_vaccinated, is_neutered,
            is_available, rescue_story, special_needs
        } = req.body;
        
        // Verificar se o animal existe
        const existingAnimal = await animalModel.getAnimalById(req.params.id);
        if (!existingAnimal) {
            return res.status(404).json({ message: "Animal não encontrado." });
        }
        
        // Processar novas fotos se enviadas
        let photos = existingAnimal.photos;
        if (req.files && req.files.length > 0) {
            photos = req.files.map(file => file.filename);
        }
        
        const animalData = {
            name, species, breed, age_category, size, gender, description,
            medical_history, personality, photos, is_vaccinated: is_vaccinated === 'true',
            is_neutered: is_neutered === 'true', is_available: is_available !== 'false',
            rescue_story, special_needs
        };
        
        const updatedAnimal = await animalModel.updateAnimal(req.params.id, animalData);
        res.json({
            message: "Animal atualizado com sucesso!",
            animal: updatedAnimal
        });
    } catch (error) {
        console.error("Erro ao atualizar animal:", error);
        res.status(500).json({ message: "Erro ao atualizar animal." });
    }
});

// DELETE - Deletar animal
router.delete("/:id", async (req, res) => {
    try {
        const animal = await animalModel.getAnimalById(req.params.id);
        if (!animal) {
            return res.status(404).json({ message: "Animal não encontrado." });
        }
        
        const result = await animalModel.deleteAnimal(req.params.id);
        res.json(result);
    } catch (error) {
        console.error("Erro ao deletar animal:", error);
        res.status(500).json({ message: "Erro ao deletar animal." });
    }
});

// ===== ROTAS EXTRAS =====

// Rota para listar animais de destaque (Para página "Home")
router.get("/featured/animals", async (req, res) => {
    try {
        const animals = await animalModel.getAnimals();
        // Retorna os 6 animais mais recentes para destaque na home
        const featuredAnimals = animals.slice(0, 6);
        res.json({
            message: "Animais em destaque",
            total: featuredAnimals.length,
            animals: featuredAnimals
        });
    } catch (error) {
        console.error("Erro ao buscar animais em destaque:", error);
        res.status(500).json({ message: "Erro ao buscar animais em destaque." });
    }
});

// Rota para obter animais por usuário (Para página "Sobre Mim")
router.get("/user/:userId", async (req, res) => {
    try {
        const animals = await animalModel.getAnimalsByUserId(req.params.userId);
        res.json({
            total: animals.length,
            animals: animals
        });
    } catch (error) {
        console.error("Erro ao buscar animais do usuário:", error);
        res.status(500).json({ message: "Erro ao buscar animais do usuário." });
    }
});

// Rota para atualizar apenas disponibilidade do animal
router.patch("/:id/availability", async (req, res) => {
    try {
        const { is_available } = req.body;
        
        const animal = await animalModel.getAnimalById(req.params.id);
        if (!animal) {
            return res.status(404).json({ message: "Animal não encontrado." });
        }
        
        const updatedAnimal = await animalModel.updateAvailabilityStatus(req.params.id, is_available);
        res.json({
            message: "Disponibilidade atualizada com sucesso!",
            animal: updatedAnimal
        });
    } catch (error) {
        console.error("Erro ao atualizar disponibilidade:", error);
        res.status(500).json({ message: "Erro ao atualizar disponibilidade." });
    }
});

module.exports = router;
