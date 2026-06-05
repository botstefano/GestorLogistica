const express = require('express');
const router = express.Router();
const auditoriasController = require('../controllers/auditoriasController');
const { authMiddleware, roleMiddleware } = require('../middleware/auth');

router.get('/', authMiddleware, roleMiddleware([1, 3]), auditoriasController.getAll);
router.get('/:id', authMiddleware, roleMiddleware([1, 3]), auditoriasController.getById);
router.get('/usuario/:usuario_id', authMiddleware, roleMiddleware([1, 3]), auditoriasController.getByUsuario);
router.get('/tabla/:tabla', authMiddleware, roleMiddleware([1, 3]), auditoriasController.getByTabla);

module.exports = router;
