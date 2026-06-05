const express = require('express');
const router = express.Router();
const inventariosController = require('../controllers/inventariosController');
const { authMiddleware } = require('../middleware/auth');
const auditoriaMiddleware = require('../middleware/auditoria');

router.get('/', authMiddleware, inventariosController.getAll);
router.get('/:id', authMiddleware, inventariosController.getById);
router.get('/producto/:producto_id', authMiddleware, inventariosController.getByProducto);
router.get('/almacen/:almacen_id', authMiddleware, inventariosController.getByAlmacen);
router.post('/', authMiddleware, auditoriaMiddleware('inventarios'), inventariosController.create);
router.put('/:id', authMiddleware, auditoriaMiddleware('inventarios'), inventariosController.update);
router.delete('/:id', authMiddleware, auditoriaMiddleware('inventarios'), inventariosController.delete);

module.exports = router;
