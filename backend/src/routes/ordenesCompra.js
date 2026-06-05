const express = require('express');
const router = express.Router();
const ordenesCompraController = require('../controllers/ordenesCompraController');
const { authMiddleware } = require('../middleware/auth');
const auditoriaMiddleware = require('../middleware/auditoria');

router.get('/', authMiddleware, ordenesCompraController.getAll);
router.get('/:id', authMiddleware, ordenesCompraController.getById);
router.get('/estado/:estado', authMiddleware, ordenesCompraController.getByEstado);
router.post('/', authMiddleware, auditoriaMiddleware('ordenes_compra'), ordenesCompraController.create);
router.put('/:id', authMiddleware, auditoriaMiddleware('ordenes_compra'), ordenesCompraController.update);
router.patch('/:id/estado', authMiddleware, auditoriaMiddleware('ordenes_compra'), ordenesCompraController.updateEstado);
router.delete('/:id', authMiddleware, auditoriaMiddleware('ordenes_compra'), ordenesCompraController.delete);

module.exports = router;
