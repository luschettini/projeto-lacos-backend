const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Rota especial deve vir antes de /:id
router.get('/protectors', userController.getProtectors);

// Rotas CRUD básicas
router.get('/', userController.getAll);
router.get('/:id', userController.getById);
router.post('/', userController.create);
router.put('/:id', userController.update);
router.delete('/:id', userController.remove);

module.exports = router;
