const express = require('express');
const router = express.Router();
const alertasController = require('../controllers/alertasController');
const { authMiddleware, roleMiddleware } = require('../middleware/auth');

// Todos pueden consultar
router.get('/', authMiddleware, alertasController.getAll);
router.get('/activas', authMiddleware, alertasController.getActivas);
router.get('/:id', authMiddleware, alertasController.getById);

// Solo Admin y Supervisor pueden actualizar estado
router.patch('/:id/estado', authMiddleware, roleMiddleware([1, 3]), alertasController.updateEstado);

module.exports = router;
