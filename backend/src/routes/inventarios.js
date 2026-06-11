const express = require('express');
const router = express.Router();
const inventariosController = require('../controllers/inventariosController');
const { authMiddleware, roleMiddleware } = require('../middleware/auth');
const auditoriaMiddleware = require('../middleware/auditoria');

// Todos pueden consultar
router.get('/', authMiddleware, inventariosController.getAll);
router.get('/:id', authMiddleware, inventariosController.getById);
router.get('/producto/:producto_id', authMiddleware, inventariosController.getByProducto);
router.get('/almacen/:almacen_id', authMiddleware, inventariosController.getByAlmacen);

// Solo Admin puede crear
router.post('/', authMiddleware, roleMiddleware([1]), auditoriaMiddleware('inventarios'), inventariosController.create);

// Admin y Operador pueden actualizar cantidades
router.put('/:id', authMiddleware, roleMiddleware([1, 2]), auditoriaMiddleware('inventarios'), inventariosController.update);

// Solo Admin puede eliminar
router.delete('/:id', authMiddleware, roleMiddleware([1]), auditoriaMiddleware('inventarios'), inventariosController.delete);

module.exports = router;
