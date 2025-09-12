const express = require('express');
const router = express.Router();
const animalController = require('../controllers/animalController');

// Rotas especiais devem vir antes de /:id
router.get('/featured', animalController.getFeatured);
router.get('/user/:userId', animalController.getByUserId);

// Rotas CRUD básicas
router.get('/', animalController.getAll);
router.get('/:id', animalController.getById);
router.post('/', animalController.create);
router.put('/:id', animalController.update);
router.delete('/:id', animalController.remove);

// Rota especial para marcar como adotado
router.patch('/:id/adopt', animalController.markAsAdopted);

module.exports = router;