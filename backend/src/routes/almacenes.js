const express = require('express');
const router = express.Router();
const almacenesController = require('../controllers/almacenesController');
const { authMiddleware } = require('../middleware/auth');
const auditoriaMiddleware = require('../middleware/auditoria');

router.get('/', authMiddleware, almacenesController.getAll);
router.get('/:id', authMiddleware, almacenesController.getById);
router.post('/', authMiddleware, auditoriaMiddleware('almacenes'), almacenesController.create);
router.put('/:id', authMiddleware, auditoriaMiddleware('almacenes'), almacenesController.update);
router.delete('/:id', authMiddleware, auditoriaMiddleware('almacenes'), almacenesController.delete);

module.exports = router;
