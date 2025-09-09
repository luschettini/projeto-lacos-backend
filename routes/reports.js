const express = require("express");
const router = express.Router();
const reportController = require("../controllers/reportController");

// Rotas para exportar relatórios de animais (simplificadas)
router.get("/animals/csv", reportController.exportAnimalsCSV);
router.get("/animals/pdf", reportController.exportAnimalsPDF);

// Rotas para exportar relatórios de usuários (simplificadas)
router.get("/users/csv", reportController.exportUsersCSV);
router.get("/users/pdf", reportController.exportUsersPDF);

module.exports = router;
