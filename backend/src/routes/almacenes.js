const express = require('express');
const router = express.Router();
const almacenesController = require('../controllers/almacenesController');
const { authMiddleware, roleMiddleware } = require('../middleware/auth');
const auditoriaMiddleware = require('../middleware/auditoria');

// Todos pueden consultar
router.get('/', authMiddleware, almacenesController.getAll);
router.get('/:id', authMiddleware, almacenesController.getById);

// Solo Admin puede crear
router.post('/', authMiddleware, roleMiddleware([1]), auditoriaMiddleware('almacenes'), almacenesController.create);

// Solo Admin y Supervisor pueden editar
router.put('/:id', authMiddleware, roleMiddleware([1, 3]), auditoriaMiddleware('almacenes'), almacenesController.update);

// Solo Admin puede eliminar
router.delete('/:id', authMiddleware, roleMiddleware([1]), auditoriaMiddleware('almacenes'), almacenesController.delete);

module.exports = router;
