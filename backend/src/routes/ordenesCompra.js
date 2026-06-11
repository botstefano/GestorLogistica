const express = require('express');
const router = express.Router();
const ordenesCompraController = require('../controllers/ordenesCompraController');
const { authMiddleware, roleMiddleware } = require('../middleware/auth');
const auditoriaMiddleware = require('../middleware/auditoria');

// Todos pueden consultar
router.get('/', authMiddleware, ordenesCompraController.getAll);
router.get('/:id', authMiddleware, ordenesCompraController.getById);
router.get('/estado/:estado', authMiddleware, ordenesCompraController.getByEstado);

// Solo Admin y Operador pueden crear
router.post('/', authMiddleware, roleMiddleware([1, 2]), auditoriaMiddleware('ordenes_compra'), ordenesCompraController.create);

// Solo Admin y Supervisor pueden editar
router.put('/:id', authMiddleware, roleMiddleware([1, 3]), auditoriaMiddleware('ordenes_compra'), ordenesCompraController.update);

// Admin, Operador y Supervisor pueden actualizar estado
router.patch('/:id/estado', authMiddleware, roleMiddleware([1, 2, 3]), auditoriaMiddleware('ordenes_compra'), ordenesCompraController.updateEstado);

// Solo Admin puede eliminar
router.delete('/:id', authMiddleware, roleMiddleware([1]), auditoriaMiddleware('ordenes_compra'), ordenesCompraController.delete);

module.exports = router;
