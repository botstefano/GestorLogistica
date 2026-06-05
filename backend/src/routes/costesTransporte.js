const express = require('express');
const router = express.Router();
const costesTransporteController = require('../controllers/costesTransporteController');
const { authMiddleware } = require('../middleware/auth');
const auditoriaMiddleware = require('../middleware/auditoria');

router.get('/', authMiddleware, costesTransporteController.getAll);
router.get('/:id', authMiddleware, costesTransporteController.getById);
router.get('/vehiculo/:vehiculo_id', authMiddleware, costesTransporteController.getByVehiculo);
router.get('/rango-fechas', authMiddleware, costesTransporteController.getByFechaRange);
router.post('/', authMiddleware, auditoriaMiddleware('costes_transporte'), costesTransporteController.create);
router.put('/:id', authMiddleware, auditoriaMiddleware('costes_transporte'), costesTransporteController.update);
router.delete('/:id', authMiddleware, auditoriaMiddleware('costes_transporte'), costesTransporteController.delete);

module.exports = router;
