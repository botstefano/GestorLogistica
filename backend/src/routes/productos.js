const express = require('express');
const router = express.Router();
const productosController = require('../controllers/productosController');
const { authMiddleware } = require('../middleware/auth');
const auditoriaMiddleware = require('../middleware/auditoria');

router.get('/', authMiddleware, productosController.getAll);
router.get('/:id', authMiddleware, productosController.getById);
router.get('/low-stock/list', authMiddleware, productosController.getLowStock);
router.post('/', authMiddleware, auditoriaMiddleware('productos'), productosController.create);
router.put('/:id', authMiddleware, auditoriaMiddleware('productos'), productosController.update);
router.delete('/:id', authMiddleware, auditoriaMiddleware('productos'), productosController.delete);

module.exports = router;
