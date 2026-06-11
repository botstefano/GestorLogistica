const express = require('express');
const router = express.Router();
const distribucionesController = require('../controllers/distribucionesController');
const { authMiddleware, roleMiddleware } = require('../middleware/auth');
const auditoriaMiddleware = require('../middleware/auditoria');

// Todos pueden consultar
router.get('/', authMiddleware, distribucionesController.getAll);
router.get('/:id', authMiddleware, distribucionesController.getById);
router.get('/estado/:estado', authMiddleware, distribucionesController.getByEstado);

// Solo Admin y Operador pueden crear
router.post('/', authMiddleware, roleMiddleware([1, 2]), auditoriaMiddleware('distribuciones'), distribucionesController.create);

// Solo Admin y Supervisor pueden editar
router.put('/:id', authMiddleware, roleMiddleware([1, 3]), auditoriaMiddleware('distribuciones'), distribucionesController.update);

// Admin, Operador y Supervisor pueden actualizar estado
router.patch('/:id/estado', authMiddleware, roleMiddleware([1, 2, 3]), auditoriaMiddleware('distribuciones'), distribucionesController.updateEstado);

// Solo Admin puede eliminar
router.delete('/:id', authMiddleware, roleMiddleware([1]), auditoriaMiddleware('distribuciones'), distribucionesController.delete);

module.exports = router;
