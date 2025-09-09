const { format } = require("@fast-csv/format");
const PDFDocument = require("pdfkit");
const animalModel = require("../models/animalModel");
const userModel = require("../models/userModel");
const adoptionInterestModel = require("../models/adoptionInterestModel");

const exportAnimalsCSV = async (req, res) => {
    try {
        const animals = await animalModel.getAnimals();

        res.setHeader("Content-Disposition", "attachment; filename=animais.csv");
        res.setHeader("Content-Type", "text/csv");

        const csvStream = format({ headers: true });
        csvStream.pipe(res);

        animals.forEach((animal) => {
            csvStream.write({
                Id: animal.id,
                Nome: animal.name,
                Especie: animal.species,
                Porte: animal.size,
                Idade: animal.age_category,
                Responsavel: animal.owner_name || "Sem responsável",
                Cidade: animal.owner_city || "Não informado",
                Disponivel: animal.is_available ? "Sim" : "Não"
            });
        });
        
        csvStream.end();
    } catch (error) {
        console.error("Erro ao gerar CSV de animais:", error);
        res.status(500).json({ message: "Erro ao gerar o CSV" });
    }
};

const exportAnimalsPDF = async (req, res) => {
    try {
        const animals = await animalModel.getAnimals();

        res.setHeader("Content-Type", "application/pdf");
        res.setHeader("Content-Disposition", "inline; filename=animais.pdf");

        const doc = new PDFDocument();
        doc.pipe(res);

        // Título
        doc.fontSize(20).text("Relatório de Animais para Adoção", { align: "center" });
        doc.moveDown();

        // Cabeçalho
        doc.fontSize(12).text("ID | Nome | Espécie | Porte | Responsável | Cidade", { underline: true });
        doc.moveDown(0.5);

        // Adicionar dados dos animais
        animals.forEach((animal) => {
            doc.text(
                `${animal.id} | ${animal.name} | ${animal.species} | ${animal.size} | ${animal.owner_name || "Sem responsável"} | ${animal.owner_city || "N/A"}`
            );
        });

        doc.end(); 
    } catch (error) {
        console.error("Erro ao gerar PDF de animais:", error);
        res.status(500).json({ message: "Erro ao gerar o PDF" }); 
    }
};

const exportUsersCSV = async (req, res) => {
    try {
        const users = await userModel.getUsers();

        res.setHeader("Content-Disposition", "attachment; filename=usuarios.csv");
        res.setHeader("Content-Type", "text/csv");

        const csvStream = format({ headers: true });
        csvStream.pipe(res);

        users.forEach((user) => {
            csvStream.write({
                Id: user.id,
                Nome: user.name,
                Email: user.email,
                Tipo: user.type,
                Cidade: user.city || "Não informado",
                Estado: user.state || "Não informado"
            });
        });
        
        csvStream.end();
    } catch (error) {
        console.error("Erro ao gerar CSV de usuários:", error);
        res.status(500).json({ message: "Erro ao gerar o CSV" });
    }
};

const exportUsersPDF = async (req, res) => {
    try {
        const users = await userModel.getUsers();

        res.setHeader("Content-Type", "application/pdf");
        res.setHeader("Content-Disposition", "inline; filename=usuarios.pdf");

        const doc = new PDFDocument();
        doc.pipe(res);

        // Título
        doc.fontSize(20).text("Relatório de Usuários", { align: "center" });
        doc.moveDown();

        // Cabeçalho
        doc.fontSize(12).text("ID | Nome | Email | Tipo | Cidade", { underline: true });
        doc.moveDown(0.5);

        // Adicionar dados dos usuários
        users.forEach((user) => {
            doc.text(
                `${user.id} | ${user.name} | ${user.email} | ${user.type} | ${user.city || "N/A"}`
            );
        });

        doc.end(); 
    } catch (error) {
        console.error("Erro ao gerar PDF de usuários:", error);
        res.status(500).json({ message: "Erro ao gerar o PDF" }); 
    }
};

module.exports = { 
    exportAnimalsCSV, 
    exportAnimalsPDF, 
    exportUsersCSV, 
    exportUsersPDF 
};
