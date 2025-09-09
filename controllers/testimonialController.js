const testimonialModel = require("../models/testimonialModel");

const getAllTestimonials = async (req, res) => {
    try {
        const { approved } = req.query;
        const isApproved = approved !== 'false'; // Default para aprovados
        const testimonials = await testimonialModel.getTestimonials(isApproved);
        res.json(testimonials);
    } catch (error) {
        console.error("Erro ao buscar depoimentos:", error);
        res.status(500).json({ message: "Erro ao buscar depoimentos." });
    }
};

const getTestimonial = async (req, res) => {
    try {
        const testimonial = await testimonialModel.getTestimonialById(req.params.id);
        if (!testimonial) {
            return res.status(404).json({ message: "Depoimento não encontrado." });
        }
        res.json(testimonial);
    } catch (error) {
        console.error("Erro ao buscar depoimento:", error);
        res.status(500).json({ message: "Erro ao buscar depoimento." });
    }
};

const getMyTestimonials = async (req, res) => {
    try {
        const testimonials = await testimonialModel.getTestimonialsByUserId(req.user.id);
        res.json(testimonials);
    } catch (error) {
        console.error("Erro ao buscar meus depoimentos:", error);
        res.status(500).json({ message: "Erro ao buscar seus depoimentos." });
    }
};

const createTestimonial = async (req, res) => {
    try {
        // Apenas adotantes podem criar depoimentos
        if (req.user.type !== 'adotante') {
            return res.status(403).json({ message: "Apenas adotantes podem criar depoimentos." });
        }
        
        const { animal_name, message } = req.body;
        const photo_url = req.file ? req.file.filename : null;
        
        const testimonialData = {
            adopter_id: req.user.id,
            animal_name,
            message,
            photo_url
        };
        
        const newTestimonial = await testimonialModel.createTestimonial(testimonialData);
        res.status(201).json(newTestimonial);
    } catch (error) {
        console.error("Erro ao criar depoimento:", error);
        res.status(500).json({ message: "Erro ao criar depoimento." });
    }
};

const approveTestimonial = async (req, res) => {
    try {
        // Apenas ONGs e protetores podem aprovar depoimentos
        if (!['ong', 'protetor'].includes(req.user.type)) {
            return res.status(403).json({ message: "Apenas ONGs e protetores podem aprovar depoimentos." });
        }
        
        const { is_approved } = req.body;
        const updatedTestimonial = await testimonialModel.updateTestimonialApproval(req.params.id, is_approved);
        
        if (!updatedTestimonial) {
            return res.status(404).json({ message: "Depoimento não encontrado." });
        }
        
        res.json(updatedTestimonial);
    } catch (error) {
        console.error("Erro ao aprovar depoimento:", error);
        res.status(500).json({ message: "Erro ao aprovar depoimento." });
    }
};

const deleteTestimonial = async (req, res) => {
    try {
        const testimonial = await testimonialModel.getTestimonialById(req.params.id);
        if (!testimonial) {
            return res.status(404).json({ message: "Depoimento não encontrado." });
        }
        
        // Apenas o autor do depoimento pode deletá-lo
        if (testimonial.adopter_id !== req.user.id) {
            return res.status(403).json({ message: "Você só pode deletar seus próprios depoimentos." });
        }
        
        const result = await testimonialModel.deleteTestimonial(req.params.id);
        res.json(result);
    } catch (error) {
        console.error("Erro ao deletar depoimento:", error);
        res.status(500).json({ message: "Erro ao deletar depoimento." });
    }
};

module.exports = {
    getAllTestimonials,
    getTestimonial,
    getMyTestimonials,
    createTestimonial,
    approveTestimonial,
    deleteTestimonial
};
