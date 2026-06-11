const express = require('express');
const router = express.Router();
const vehiculosController = require('../controllers/vehiculosController');
const { authMiddleware, roleMiddleware } = require('../middleware/auth');
const auditoriaMiddleware = require('../middleware/auditoria');

// Todos pueden consultar
router.get('/', authMiddleware, vehiculosController.getAll);
router.get('/activos', authMiddleware, vehiculosController.getActivos);
router.get('/:id', authMiddleware, vehiculosController.getById);

// Solo Admin puede crear
router.post('/', authMiddleware, roleMiddleware([1]), auditoriaMiddleware('vehiculos'), vehiculosController.create);

// Solo Admin y Supervisor pueden editar
router.put('/:id', authMiddleware, roleMiddleware([1, 3]), auditoriaMiddleware('vehiculos'), vehiculosController.update);

// Solo Admin puede eliminar
router.delete('/:id', authMiddleware, roleMiddleware([1]), auditoriaMiddleware('vehiculos'), vehiculosController.delete);

module.exports = router;
