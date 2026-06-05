const express = require('express');
const router = express.Router();
const dashboardController = require('../controllers/dashboardController');
const { authMiddleware } = require('../middleware/auth');

router.get('/kpis', authMiddleware, dashboardController.getKPIs);
router.get('/costes-por-mes/:anio', authMiddleware, dashboardController.getCostesPorMes);
router.get('/top-productos-coste', authMiddleware, dashboardController.getTopProductosCoste);

module.exports = router;
