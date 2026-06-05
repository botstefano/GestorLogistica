const express = require('express');
const router = express.Router();
const proveedoresController = require('../controllers/proveedoresController');
const { authMiddleware } = require('../middleware/auth');
const auditoriaMiddleware = require('../middleware/auditoria');

router.get('/', authMiddleware, proveedoresController.getAll);
router.get('/:id', authMiddleware, proveedoresController.getById);
router.post('/', authMiddleware, auditoriaMiddleware('proveedores'), proveedoresController.create);
router.put('/:id', authMiddleware, auditoriaMiddleware('proveedores'), proveedoresController.update);
router.delete('/:id', authMiddleware, auditoriaMiddleware('proveedores'), proveedoresController.delete);

module.exports = router;
