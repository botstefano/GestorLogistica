const express = require('express');
const router = express.Router();
const distribucionesController = require('../controllers/distribucionesController');
const { authMiddleware } = require('../middleware/auth');
const auditoriaMiddleware = require('../middleware/auditoria');

router.get('/', authMiddleware, distribucionesController.getAll);
router.get('/:id', authMiddleware, distribucionesController.getById);
router.get('/estado/:estado', authMiddleware, distribucionesController.getByEstado);
router.post('/', authMiddleware, auditoriaMiddleware('distribuciones'), distribucionesController.create);
router.put('/:id', authMiddleware, auditoriaMiddleware('distribuciones'), distribucionesController.update);
router.patch('/:id/estado', authMiddleware, auditoriaMiddleware('distribuciones'), distribucionesController.updateEstado);
router.delete('/:id', authMiddleware, auditoriaMiddleware('distribuciones'), distribucionesController.delete);

module.exports = router;
