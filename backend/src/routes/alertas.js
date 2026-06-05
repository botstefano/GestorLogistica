const express = require('express');
const router = express.Router();
const alertasController = require('../controllers/alertasController');
const { authMiddleware } = require('../middleware/auth');

router.get('/', authMiddleware, alertasController.getAll);
router.get('/activas', authMiddleware, alertasController.getActivas);
router.get('/:id', authMiddleware, alertasController.getById);
router.patch('/:id/estado', authMiddleware, alertasController.updateEstado);

module.exports = router;
