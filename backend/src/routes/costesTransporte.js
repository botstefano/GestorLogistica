const express = require('express');
const router = express.Router();
const costesTransporteController = require('../controllers/costesTransporteController');
const { authMiddleware, roleMiddleware } = require('../middleware/auth');
const auditoriaMiddleware = require('../middleware/auditoria');

// Todos pueden consultar
router.get('/', authMiddleware, costesTransporteController.getAll);
router.get('/:id', authMiddleware, costesTransporteController.getById);
router.get('/vehiculo/:vehiculo_id', authMiddleware, costesTransporteController.getByVehiculo);
router.get('/rango-fechas', authMiddleware, costesTransporteController.getByFechaRange);

// Solo Admin y Operador pueden crear
router.post('/', authMiddleware, roleMiddleware([1, 2]), auditoriaMiddleware('costes_transporte'), costesTransporteController.create);

// Solo Admin y Supervisor pueden editar
router.put('/:id', authMiddleware, roleMiddleware([1, 3]), auditoriaMiddleware('costes_transporte'), costesTransporteController.update);

// Solo Admin puede eliminar
router.delete('/:id', authMiddleware, roleMiddleware([1]), auditoriaMiddleware('costes_transporte'), costesTransporteController.delete);

module.exports = router;
