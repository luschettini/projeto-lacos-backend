const adoptionInterestModel = require("../models/adoptionInterestModel");

const getAllAdoptionInterests = async (req, res) => {
    try {
        const interests = await adoptionInterestModel.getAdoptionInterests(req.user.id, req.user.type);
        res.json(interests);
    } catch (error) {
        console.error("Erro ao buscar interesses de adoção:", error);
        res.status(500).json({ message: "Erro ao buscar interesses de adoção." });
    }
};

const getAdoptionInterest = async (req, res) => {
    try {
        const interest = await adoptionInterestModel.getAdoptionInterestById(req.params.id);
        if (!interest) {
            return res.status(404).json({ message: "Interesse de adoção não encontrado." });
        }
        
        // Verificar se o usuário tem permissão para ver este interesse
        if (interest.adopter_id !== req.user.id && interest.owner_id !== req.user.id) {
            return res.status(403).json({ message: "Acesso negado." });
        }
        
        res.json(interest);
    } catch (error) {
        console.error("Erro ao buscar interesse de adoção:", error);
        res.status(500).json({ message: "Erro ao buscar interesse de adoção." });
    }
};

const createAdoptionInterest = async (req, res) => {
    try {
        // Apenas adotantes podem manifestar interesse
        if (req.user.type !== 'adotante') {
            return res.status(403).json({ message: "Apenas adotantes podem manifestar interesse em adoção." });
        }
        
        const { animal_id, message, contact_preference } = req.body;
        
        const interestData = {
            animal_id,
            adopter_id: req.user.id,
            message,
            contact_preference: contact_preference || 'email'
        };
        
        const newInterest = await adoptionInterestModel.createAdoptionInterest(interestData);
        
        if (newInterest.error) {
            return res.status(400).json({ message: newInterest.error });
        }
        
        res.status(201).json(newInterest);
    } catch (error) {
        console.error("Erro ao criar interesse de adoção:", error);
        res.status(500).json({ message: "Erro ao manifestar interesse de adoção." });
    }
};

const updateAdoptionInterestStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const validStatuses = ['pendente', 'aprovado', 'rejeitado', 'concluido'];
        
        if (!validStatuses.includes(status)) {
            return res.status(400).json({ message: "Status inválido." });
        }
        
        // Verificar se o usuário tem permissão para atualizar este interesse
        const interest = await adoptionInterestModel.getAdoptionInterestById(req.params.id);
        if (!interest) {
            return res.status(404).json({ message: "Interesse de adoção não encontrado." });
        }
        
        // Apenas o dono do animal pode atualizar o status
        if (interest.owner_id !== req.user.id) {
            return res.status(403).json({ message: "Apenas o responsável pelo animal pode atualizar o status." });
        }
        
        const updatedInterest = await adoptionInterestModel.updateAdoptionInterestStatus(req.params.id, status);
        res.json(updatedInterest);
    } catch (error) {
        console.error("Erro ao atualizar status do interesse:", error);
        res.status(500).json({ message: "Erro ao atualizar status do interesse." });
    }
};

const deleteAdoptionInterest = async (req, res) => {
    try {
        const interest = await adoptionInterestModel.getAdoptionInterestById(req.params.id);
        if (!interest) {
            return res.status(404).json({ message: "Interesse de adoção não encontrado." });
        }
        
        // Apenas o adotante pode deletar seu próprio interesse
        if (interest.adopter_id !== req.user.id) {
            return res.status(403).json({ message: "Você só pode deletar seus próprios interesses." });
        }
        
        const result = await adoptionInterestModel.deleteAdoptionInterest(req.params.id);
        res.json(result);
    } catch (error) {
        console.error("Erro ao deletar interesse de adoção:", error);
        res.status(500).json({ message: "Erro ao deletar interesse de adoção." });
    }
};

const getInterestsByAnimal = async (req, res) => {
    try {
        const interests = await adoptionInterestModel.getInterestsByAnimalId(req.params.animalId);
        res.json(interests);
    } catch (error) {
        console.error("Erro ao buscar interesses do animal:", error);
        res.status(500).json({ message: "Erro ao buscar interesses do animal." });
    }
};

module.exports = {
    getAllAdoptionInterests,
    getAdoptionInterest,
    createAdoptionInterest,
    updateAdoptionInterestStatus,
    deleteAdoptionInterest,
    getInterestsByAnimal
};
