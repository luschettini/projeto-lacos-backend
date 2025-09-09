const animalModel = require("../models/animalModel");

const getAllAnimals = async (req, res) => {
    try {
        const { species, size, age_category, city, gender } = req.query;
        const filters = {};
        
        if (species) filters.species = species;
        if (size) filters.size = size;
        if (age_category) filters.age_category = age_category;
        if (city) filters.city = city;
        if (gender) filters.gender = gender;
        
        const animals = await animalModel.getAnimals(filters);
        res.json(animals);
    } catch (error) {
        console.error("Erro ao buscar animais:", error);
        res.status(500).json({ message: "Erro ao buscar animais." });
    }
};

const getAnimal = async (req, res) => {
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
};

const getMyAnimals = async (req, res) => {
    try {
        const animals = await animalModel.getAnimalsByUserId(req.user.id);
        res.json(animals);
    } catch (error) {
        console.error("Erro ao buscar meus animais:", error);
        res.status(500).json({ message: "Erro ao buscar seus animais." });
    }
};

const createAnimal = async (req, res) => {
    try {
        const {
            name, species, breed, age_category, size, gender, description,
            medical_history, personality, is_vaccinated, is_neutered,
            rescue_story, special_needs
        } = req.body;
        
        // Processar fotos enviadas
        const photos = req.files ? req.files.map(file => file.filename) : [];
        
        const animalData = {
            name, species, breed, age_category, size, gender, description,
            medical_history, personality, photos, is_vaccinated: is_vaccinated === 'true',
            is_neutered: is_neutered === 'true', rescue_story, special_needs,
            user_id: req.user.id
        };
        
        const newAnimal = await animalModel.createAnimal(animalData);
        res.status(201).json(newAnimal);
    } catch (error) {
        console.error("Erro ao criar animal:", error);
        res.status(500).json({ message: "Erro ao cadastrar animal." });
    }
};

const updateAnimal = async (req, res) => {
    try {
        // Verificar se o animal pertence ao usuário
        const animal = await animalModel.getAnimalById(req.params.id);
        if (!animal) {
            return res.status(404).json({ message: "Animal não encontrado." });
        }
        
        if (animal.user_id !== req.user.id) {
            return res.status(403).json({ message: "Você só pode editar seus próprios animais." });
        }
        
        const {
            name, species, breed, age_category, size, gender, description,
            medical_history, personality, is_vaccinated, is_neutered,
            is_available, rescue_story, special_needs
        } = req.body;
        
        // Processar novas fotos se enviadas
        let photos = animal.photos;
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
        res.json(updatedAnimal);
    } catch (error) {
        console.error("Erro ao atualizar animal:", error);
        res.status(500).json({ message: "Erro ao atualizar animal." });
    }
};

const deleteAnimal = async (req, res) => {
    try {
        // Verificar se o animal pertence ao usuário
        const animal = await animalModel.getAnimalById(req.params.id);
        if (!animal) {
            return res.status(404).json({ message: "Animal não encontrado." });
        }
        
        if (animal.user_id !== req.user.id) {
            return res.status(403).json({ message: "Você só pode deletar seus próprios animais." });
        }
        
        const result = await animalModel.deleteAnimal(req.params.id);
        res.json(result);
    } catch (error) {
        console.error("Erro ao deletar animal:", error);
        res.status(500).json({ message: "Erro ao deletar animal." });
    }
};

const updateAvailability = async (req, res) => {
    try {
        const { is_available } = req.body;
        
        // Verificar se o animal pertence ao usuário
        const animal = await animalModel.getAnimalById(req.params.id);
        if (!animal) {
            return res.status(404).json({ message: "Animal não encontrado." });
        }
        
        if (animal.user_id !== req.user.id) {
            return res.status(403).json({ message: "Você só pode atualizar seus próprios animais." });
        }
        
        const updatedAnimal = await animalModel.updateAvailabilityStatus(req.params.id, is_available);
        res.json(updatedAnimal);
    } catch (error) {
        console.error("Erro ao atualizar disponibilidade:", error);
        res.status(500).json({ message: "Erro ao atualizar disponibilidade." });
    }
};

module.exports = {
    getAllAnimals,
    getAnimal,
    getMyAnimals,
    createAnimal,
    updateAnimal,
    deleteAnimal,
    updateAvailability
};
