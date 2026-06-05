const express = require('express');
const router = express.Router();
const usuariosController = require('../controllers/usuariosController');
const { authMiddleware, roleMiddleware } = require('../middleware/auth');

router.get('/', authMiddleware, roleMiddleware([1]), usuariosController.getAll);
router.get('/:id', authMiddleware, usuariosController.getById);
router.post('/', authMiddleware, roleMiddleware([1]), usuariosController.create);
router.put('/:id', authMiddleware, roleMiddleware([1]), usuariosController.update);
router.delete('/:id', authMiddleware, roleMiddleware([1]), usuariosController.delete);

module.exports = router;
