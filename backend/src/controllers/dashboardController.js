const CosteLogisticoModel = require('../models/costesLogisticos');
const CosteAlmacenamientoModel = require('../models/costesAlmacenamiento');
const CosteTransporteModel = require('../models/costesTransporte');
const OrdenCompraModel = require('../models/ordenesCompra');
const ProductoModel = require('../models/productos');
const AlertaSobrecosteModel = require('../models/alertasSobrecostes');
const InventarioModel = require('../models/inventarios');

const dashboardController = {
  async getKPIs(req, res) {
    try {
      const today = new Date();
      const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
      // Query all available data from 2024 onwards to show simulation data
      const fecha_inicio = '2024-01-01';
      const fecha_fin = today.toISOString().split('T')[0];

      const totalLogistico = await CosteLogisticoModel.getGrandTotal(fecha_inicio, fecha_fin);
      const costesPorTipo = await CosteLogisticoModel.getTotalByPeriod(fecha_inicio, fecha_fin);
      const alertasActivas = await AlertaSobrecosteModel.getActivas();
      const productosBajoStock = await ProductoModel.getLowStock();
      const ordenesPendientes = await OrdenCompraModel.getByEstado('pendiente');
      const totalTransporte = await CosteTransporteModel.getTotalByPeriod(fecha_inicio, fecha_fin);

      const costesAlmacenamientoPorProducto = await CosteAlmacenamientoModel.getTotalByPeriod(fecha_inicio, fecha_fin);

      const inventarioTotal = await InventarioModel.findAll();
      const totalUnidades = inventarioTotal.reduce((sum, inv) => sum + inv.cantidad, 0);

      res.json({
        periodo: { inicio: fecha_inicio, fin: fecha_fin },
        coste_logistico_total: totalLogistico?.total || 0,
        costes_por_tipo: costesPorTipo || [],
        alertas_activas: alertasActivas.length,
        alertas: alertasActivas,
        productos_bajo_stock: productosBajoStock.length,
        productos_bajo_stock_lista: productosBajoStock,
        ordenes_pendientes: ordenesPendientes.length,
        total_unidades_inventario: totalUnidades,
        transporte: {
          total_kilometros: totalTransporte?.total_kilometros || 0,
          coste_total: totalTransporte?.total_general || 0,
          coste_por_km: totalTransporte?.total_kilometros > 0 
            ? (totalTransporte?.total_general / totalTransporte?.total_kilometros).toFixed(2) 
            : 0
        },
        almacenamiento: costesAlmacenamientoPorProducto || []
      });
    } catch (error) {
      console.error('Error al obtener KPIs del dashboard:', error);
      res.status(500).json({ error: 'Error al obtener KPIs del dashboard' });
    }
  },

  async getCostesPorMes(req, res) {
    try {
      const { anio } = req.params;
      const costesPorTipo = [];

      for (let mes = 1; mes <= 12; mes++) {
        const fecha_inicio = `${anio}-${mes.toString().padStart(2, '0')}-01`;
        const fecha_fin = `${anio}-${mes.toString().padStart(2, '0')}-31`;
        
        const total = await CosteLogisticoModel.getGrandTotal(fecha_inicio, fecha_fin);
        costesPorTipo.push({
          mes,
          total: total?.total || 0
        });
      }

      res.json(costesPorTipo);
    } catch (error) {
      console.error('Error al obtener costes por mes:', error);
      res.status(500).json({ error: 'Error al obtener costes por mes' });
    }
  },

  async getTopProductosCoste(req, res) {
    try {
      const today = new Date();
      const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
      // Query all available data from 2024 onwards to show simulation data
      const fecha_inicio = '2024-01-01';
      const fecha_fin = today.toISOString().split('T')[0];

      const productos = await ProductoModel.findAll();
      const productosConCoste = [];

      for (const producto of productos) {
        const inventarios = await InventarioModel.findByProducto(producto.id);
        const cantidadTotal = inventarios.reduce((sum, inv) => sum + inv.cantidad, 0);
        
        if (cantidadTotal > 0) {
          const costesAlmacenamiento = await CosteAlmacenamientoModel.getTotalByPeriod(fecha_inicio, fecha_fin);
          const costeTotal = costesAlmacenamiento.reduce((sum, coste) => sum + parseFloat(coste.total), 0);
          const costePorUnidad = costeTotal / cantidadTotal;

          productosConCoste.push({
            ...producto,
            cantidad_total: cantidadTotal,
            coste_almacenamiento: costeTotal,
            coste_por_unidad: costePorUnidad.toFixed(2)
          });
        }
      }

      productosConCoste.sort((a, b) => b.coste_almacenamiento - a.coste_almacenamiento);
      const topProductos = productosConCoste.slice(0, 3);

      res.json(topProductos);
    } catch (error) {
      console.error('Error al obtener top productos por coste:', error);
      res.status(500).json({ error: 'Error al obtener top productos por coste' });
    }
  }
};

module.exports = dashboardController;
