const express = require("express");
const cors = require("cors");
const path = require("path");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Servir arquivos estáticos (uploads)
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Importar rotas
const userRoutes = require("./routes/users");
const animalRoutes = require("./routes/animals");
const adoptionInterestRoutes = require("./routes/adoptionInterests");
const testimonialRoutes = require("./routes/testimonials");
const reportRoutes = require("./routes/reports");

// Usar rotas
app.use("/api/users", userRoutes);
app.use("/api/animals", animalRoutes);
app.use("/api/adoption-interests", adoptionInterestRoutes);
app.use("/api/testimonials", testimonialRoutes);
app.use("/api/reports", reportRoutes);

// Rota de teste
app.get("/", (req, res) => {
    res.json({
        message: "🐾 Bem-vindo à API do Laços de Pata! 🐾",
        version: "1.0.0",
        description: "Backend para projeto de adoção de animais",
        pages: {
            home: "GET /api/animals/featured/animals - Animais em destaque",
            listagem: "GET /api/animals - Lista todos os animais com filtros",
            detalhes: "GET /api/animals/:id - Detalhes de um animal específico",
            sobre_mim: "GET /api/users/protectors - Lista ONGs e protetores",
            depoimentos: "GET /api/testimonials - Lista depoimentos aprovados"
        },
        endpoints: {
            users: "/api/users", 
            animals: "/api/animals",
            adoption_interests: "/api/adoption-interests",
            testimonials: "/api/testimonials",
            reports: "/api/reports"
        }
    });
});

// Middleware de tratamento de erros
app.use((err, req, res, next) => {
    console.error("Erro:", err.stack);
    res.status(500).json({ message: "Algo deu errado no servidor!" });
});

// Middleware para rotas não encontradas
app.use("*", (req, res) => {
    res.status(404).json({ message: "Rota não encontrada" });
});

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`🚀 Servidor rodando na porta ${PORT}`);
    console.log(`📍 Acesse: http://localhost:${PORT}`);
    console.log(`📖 Documentação da API: http://localhost:${PORT}`);
});

module.exports = app;
