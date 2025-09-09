const express = require("express");
const router = express.Router();
const testimonialModel = require("../models/testimonialModel");
const upload = require("../middleware/upload");

// Rota para listar depoimentos aprovados (Para página "Depoimentos")
router.get("/", async (req, res) => {
    try {
        const testimonials = await testimonialModel.getTestimonials(true);
        res.json(testimonials);
    } catch (error) {
        console.error("Erro ao buscar depoimentos:", error);
        res.status(500).json({ message: "Erro ao buscar depoimentos." });
    }
});

// Rota para obter depoimento por ID
router.get("/:id", async (req, res) => {
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
});

// Rota para criar depoimento (simplificada)
router.post("/", upload.single("photo"), async (req, res) => {
    try {
        const { adopter_id, animal_name, message } = req.body;
        const photo_url = req.file ? req.file.filename : null;
        
        const testimonialData = {
            adopter_id,
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
});

// Rota para aprovar depoimento (simplificada)
router.patch("/:id/approve", async (req, res) => {
    try {
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
});

module.exports = router;
