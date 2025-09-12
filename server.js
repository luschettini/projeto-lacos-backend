const express = require("express");
const cors = require("cors");
const path = require("path");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3002;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Importar rotas
const userRoutes = require("./src/routes/users");
const animalRoutes = require("./src/routes/animals");

// Usar rotas
app.use("/api/users", userRoutes);
app.use("/api/animals", animalRoutes);

// Rota de teste
app.get("/", (req, res) => {
    res.json({
        message: "🐾 Bem-vindo à API do Laços de Pata! 🐾",
        version: "1.0.0",
        description: "Backend para projeto de adoção de animais",
        endpoints: {
            users: "/api/users", 
            animals: "/api/animals"
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
});

module.exports = app;
