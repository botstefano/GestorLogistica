const express = require('express');
const router = express.Router();
const productosController = require('../controllers/productosController');
const { authMiddleware, roleMiddleware } = require('../middleware/auth');
const auditoriaMiddleware = require('../middleware/auditoria');

// Todos pueden consultar
router.get('/', authMiddleware, productosController.getAll);
router.get('/:id', authMiddleware, productosController.getById);
router.get('/low-stock/list', authMiddleware, productosController.getLowStock);

// Solo Admin puede crear
router.post('/', authMiddleware, roleMiddleware([1]), auditoriaMiddleware('productos'), productosController.create);

// Solo Admin y Supervisor pueden editar
router.put('/:id', authMiddleware, roleMiddleware([1, 3]), auditoriaMiddleware('productos'), productosController.update);

// Solo Admin puede eliminar
router.delete('/:id', authMiddleware, roleMiddleware([1]), auditoriaMiddleware('productos'), productosController.delete);

module.exports = router;
