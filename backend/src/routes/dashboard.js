const express = require('express');
const router = express.Router();
const dashboardController = require('../controllers/dashboardController');
const { authMiddleware, roleMiddleware } = require('../middleware/auth');

// Todos pueden consultar KPIs básicos
router.get('/kpis', authMiddleware, dashboardController.getKPIs);

// Solo Admin, Supervisor y Gerente pueden ver reportes detallados
router.get('/costes-por-mes/:anio', authMiddleware, roleMiddleware([1, 3, 4]), dashboardController.getCostesPorMes);
router.get('/top-productos-coste', authMiddleware, roleMiddleware([1, 3, 4]), dashboardController.getTopProductosCoste);

module.exports = router;
