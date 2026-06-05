const express = require('express');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./routes/auth');
const usuariosRoutes = require('./routes/usuarios');
const proveedoresRoutes = require('./routes/proveedores');
const productosRoutes = require('./routes/productos');
const ordenesCompraRoutes = require('./routes/ordenesCompra');
const inventariosRoutes = require('./routes/inventarios');
const costesAlmacenamientoRoutes = require('./routes/costesAlmacenamiento');
const vehiculosRoutes = require('./routes/vehiculos');
const costesTransporteRoutes = require('./routes/costesTransporte');
const almacenesRoutes = require('./routes/almacenes');
const distribucionesRoutes = require('./routes/distribuciones');
const alertasRoutes = require('./routes/alertas');
const auditoriasRoutes = require('./routes/auditorias');
const dashboardRoutes = require('./routes/dashboard');

const errorHandler = require('./middleware/errorHandler');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/auth', authRoutes);
app.use('/api/usuarios', usuariosRoutes);
app.use('/api/proveedores', proveedoresRoutes);
app.use('/api/productos', productosRoutes);
app.use('/api/ordenes-compra', ordenesCompraRoutes);
app.use('/api/inventarios', inventariosRoutes);
app.use('/api/costes-almacenamiento', costesAlmacenamientoRoutes);
app.use('/api/vehiculos', vehiculosRoutes);
app.use('/api/costes-transporte', costesTransporteRoutes);
app.use('/api/almacenes', almacenesRoutes);
app.use('/api/distribuciones', distribucionesRoutes);
app.use('/api/alertas', alertasRoutes);
app.use('/api/auditorias', auditoriasRoutes);
app.use('/api/dashboard', dashboardRoutes);

app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Sistema de Gestión de Costes Logísticos - API funcionando' });
});

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en puerto ${PORT}`);
  console.log(`📡 API disponible en http://localhost:${PORT}`);
  console.log(`🏥 Health check: http://localhost:${PORT}/api/health`);
});

module.exports = app;
