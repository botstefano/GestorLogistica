const express = require('express');
const router = express.Router();
const costesLogisticosController = require('../controllers/costesLogisticosController');
const { authMiddleware, roleMiddleware } = require('../middleware/auth');

// Todos los roles autenticados pueden ver costes logísticos
router.get('/', authMiddleware, costesLogisticosController.getAll);
router.get('/:id', authMiddleware, costesLogisticosController.getById);
router.get('/tipo/:tipo', authMiddleware, costesLogisticosController.getByTipo);
router.get('/rango-fechas', authMiddleware, costesLogisticosController.getByFechaRange);

// Solo Admin y Supervisor pueden crear costes logísticos
router.post('/', authMiddleware, roleMiddleware([1, 3]), costesLogisticosController.create);

module.exports = router;
