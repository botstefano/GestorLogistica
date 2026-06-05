const express = require('express');
const router = express.Router();
const costesAlmacenamientoController = require('../controllers/costesAlmacenamientoController');
const { authMiddleware } = require('../middleware/auth');
const auditoriaMiddleware = require('../middleware/auditoria');

router.get('/', authMiddleware, costesAlmacenamientoController.getAll);
router.get('/:id', authMiddleware, costesAlmacenamientoController.getById);
router.get('/almacen/:almacen_id', authMiddleware, costesAlmacenamientoController.getByAlmacen);
router.get('/rango-fechas', authMiddleware, costesAlmacenamientoController.getByFechaRange);
router.post('/', authMiddleware, auditoriaMiddleware('costes_almacenamiento'), costesAlmacenamientoController.create);
router.put('/:id', authMiddleware, auditoriaMiddleware('costes_almacenamiento'), costesAlmacenamientoController.update);
router.delete('/:id', authMiddleware, auditoriaMiddleware('costes_almacenamiento'), costesAlmacenamientoController.delete);

module.exports = router;
