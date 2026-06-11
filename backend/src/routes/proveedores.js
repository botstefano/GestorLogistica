const express = require('express');
const router = express.Router();
const proveedoresController = require('../controllers/proveedoresController');
const { authMiddleware, roleMiddleware } = require('../middleware/auth');
const auditoriaMiddleware = require('../middleware/auditoria');

// Todos pueden consultar
router.get('/', authMiddleware, proveedoresController.getAll);
router.get('/:id', authMiddleware, proveedoresController.getById);

// Solo Admin y Operador pueden crear
router.post('/', authMiddleware, roleMiddleware([1, 2]), auditoriaMiddleware('proveedores'), proveedoresController.create);

// Solo Admin y Supervisor pueden editar
router.put('/:id', authMiddleware, roleMiddleware([1, 3]), auditoriaMiddleware('proveedores'), proveedoresController.update);

// Solo Admin puede eliminar
router.delete('/:id', authMiddleware, roleMiddleware([1]), auditoriaMiddleware('proveedores'), proveedoresController.delete);

module.exports = router;
