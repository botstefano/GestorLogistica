const express = require('express');
const router = express.Router();
const costesAlmacenamientoController = require('../controllers/costesAlmacenamientoController');
const { authMiddleware, roleMiddleware } = require('../middleware/auth');
const auditoriaMiddleware = require('../middleware/auditoria');

// Todos pueden consultar
router.get('/', authMiddleware, costesAlmacenamientoController.getAll);
router.get('/:id', authMiddleware, costesAlmacenamientoController.getById);
router.get('/almacen/:almacen_id', authMiddleware, costesAlmacenamientoController.getByAlmacen);
router.get('/rango-fechas', authMiddleware, costesAlmacenamientoController.getByFechaRange);

// Solo Admin y Operador pueden crear
router.post('/', authMiddleware, roleMiddleware([1, 2]), auditoriaMiddleware('costes_almacenamiento'), costesAlmacenamientoController.create);

// Solo Admin y Supervisor pueden editar
router.put('/:id', authMiddleware, roleMiddleware([1, 3]), auditoriaMiddleware('costes_almacenamiento'), costesAlmacenamientoController.update);

// Solo Admin puede eliminar
router.delete('/:id', authMiddleware, roleMiddleware([1]), auditoriaMiddleware('costes_almacenamiento'), costesAlmacenamientoController.delete);

module.exports = router;
