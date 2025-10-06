const express = require("express");
const cors = require("cors");
const path = require("path");
require("dotenv").config();
const multer = require("multer");

const app = express();
const PORT = process.env.PORT || 3002;

// Apenas substitua estas duas linhas:

app.use(cors({
  origin: '*', // ⚠️ Liberal para desenvolvimento
  credentials: false
}));

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); 
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

// Importar rotas
const userRoutes = require("./src/routes/users");
const animalRoutes = require("./src/routes/animals");
const testimonialRoutes = require("./src/routes/testimonials");

// Usar rotas
app.use("/api/users", userRoutes);
app.use("/api/animals", animalRoutes);
app.use("/api/testimonials", testimonialRoutes);

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
