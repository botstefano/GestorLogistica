const OrdenCompraModel = require('../models/ordenesCompra');
const ProductoModel = require('../models/productos');
const InventarioModel = require('../models/inventarios');
const CosteLogisticoModel = require('../models/costesLogisticos');
const AlertaSobrecosteModel = require('../models/alertasSobrecostes');
const ConfiguracionModel = require('../models/configuracion');

const ordenesCompraController = {
  async getAll(req, res) {
    try {
      const ordenes = await OrdenCompraModel.findAll();
      res.json(ordenes);
    } catch (error) {
      console.error('Error al obtener órdenes de compra:', error);
      res.status(500).json({ error: 'Error al obtener órdenes de compra' });
    }
  },

  async getById(req, res) {
    try {
      const orden = await OrdenCompraModel.findById(req.params.id);
      if (!orden) {
        return res.status(404).json({ error: 'Orden de compra no encontrada' });
      }
      const detalles = await OrdenCompraModel.getDetalles(req.params.id);
      res.json({ ...orden, detalles });
    } catch (error) {
      console.error('Error al obtener orden de compra:', error);
      res.status(500).json({ error: 'Error al obtener orden de compra' });
    }
  },

  async create(req, res) {
    try {
      const { proveedor_id, fecha_entrega_esperada, detalles } = req.body;
      const usuario_registra_id = req.user.id;

      const orden = await OrdenCompraModel.create({
        proveedor_id,
        fecha_entrega_esperada,
        usuario_registra_id
      });

      let total = 0;
      for (const detalle of detalles) {
        const subtotal = detalle.cantidad * detalle.precio_unitario;
        await OrdenCompraModel.addDetalle({
          orden_compra_id: orden.id,
          producto_id: detalle.producto_id,
          cantidad: detalle.cantidad,
          precio_unitario: detalle.precio_unitario,
          subtotal
        });
        total += subtotal;
      }

      await OrdenCompraModel.updateTotal(orden.id, total);

      const ordenCompleta = await OrdenCompraModel.findById(orden.id);
      const detallesCompletos = await OrdenCompraModel.getDetalles(orden.id);

      res.status(201).json({ ...ordenCompleta, detalles: detallesCompletos });
    } catch (error) {
      console.error('Error al crear orden de compra:', error);
      res.status(500).json({ error: 'Error al crear orden de compra' });
    }
  },

  async update(req, res) {
    try {
      const orden = await OrdenCompraModel.update(req.params.id, req.body);
      if (!orden) {
        return res.status(404).json({ error: 'Orden de compra no encontrada' });
      }
      res.json(orden);
    } catch (error) {
      console.error('Error al actualizar orden de compra:', error);
      res.status(500).json({ error: 'Error al actualizar orden de compra' });
    }
  },

  async updateEstado(req, res) {
    try {
      const { estado } = req.body;
      const orden = await OrdenCompraModel.findById(req.params.id);
      
      if (!orden) {
        return res.status(404).json({ error: 'Orden de compra no encontrada' });
      }

      await OrdenCompraModel.updateEstado(req.params.id, estado);

      if (estado === 'en_almacen' || estado === 'entregado') {
        const detalles = await OrdenCompraModel.getDetalles(req.params.id);
        
        for (const detalle of detalles) {
          await ProductoModel.updateStock(detalle.producto_id, detalle.cantidad);
          await InventarioModel.create({
            producto_id: detalle.producto_id,
            almacen_id: 1,
            cantidad: detalle.cantidad,
            ubicacion_estanteria: 'AUTO'
          });
        }
      }

      const ordenActualizada = await OrdenCompraModel.findById(req.params.id);
      res.json(ordenActualizada);
    } catch (error) {
      console.error('Error al actualizar estado:', error);
      res.status(500).json({ error: 'Error al actualizar estado' });
    }
  },

  async delete(req, res) {
    try {
      const orden = await OrdenCompraModel.delete(req.params.id);
      if (!orden) {
        return res.status(404).json({ error: 'Orden de compra no encontrada' });
      }
      res.json({ message: 'Orden de compra eliminada correctamente' });
    } catch (error) {
      console.error('Error al eliminar orden de compra:', error);
      res.status(500).json({ error: 'Error al eliminar orden de compra' });
    }
  },

  async getByEstado(req, res) {
    try {
      const ordenes = await OrdenCompraModel.getByEstado(req.params.estado);
      res.json(ordenes);
    } catch (error) {
      console.error('Error al obtener órdenes por estado:', error);
      res.status(500).json({ error: 'Error al obtener órdenes por estado' });
    }
  }
};

module.exports = ordenesCompraController;
