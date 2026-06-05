const express = require('express');
const router = express.Router();
const vehiculosController = require('../controllers/vehiculosController');
const { authMiddleware } = require('../middleware/auth');
const auditoriaMiddleware = require('../middleware/auditoria');

router.get('/', authMiddleware, vehiculosController.getAll);
router.get('/activos', authMiddleware, vehiculosController.getActivos);
router.get('/:id', authMiddleware, vehiculosController.getById);
router.post('/', authMiddleware, auditoriaMiddleware('vehiculos'), vehiculosController.create);
router.put('/:id', authMiddleware, auditoriaMiddleware('vehiculos'), vehiculosController.update);
router.delete('/:id', authMiddleware, auditoriaMiddleware('vehiculos'), vehiculosController.delete);

module.exports = router;
