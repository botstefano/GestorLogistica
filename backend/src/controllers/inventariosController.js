const InventarioModel = require('../models/inventarios');

const inventariosController = {
  async getAll(req, res) {
    try {
      const inventarios = await InventarioModel.findAll();
      res.json(inventarios);
    } catch (error) {
      console.error('Error al obtener inventarios:', error);
      res.status(500).json({ error: 'Error al obtener inventarios' });
    }
  },

  async getById(req, res) {
    try {
      const inventario = await InventarioModel.findById(req.params.id);
      if (!inventario) {
        return res.status(404).json({ error: 'Inventario no encontrado' });
      }
      res.json(inventario);
    } catch (error) {
      console.error('Error al obtener inventario:', error);
      res.status(500).json({ error: 'Error al obtener inventario' });
    }
  },

  async create(req, res) {
    try {
      const inventario = await InventarioModel.create(req.body);
      res.status(201).json(inventario);
    } catch (error) {
      console.error('Error al crear inventario:', error);
      res.status(500).json({ error: 'Error al crear inventario' });
    }
  },

  async update(req, res) {
    try {
      const inventario = await InventarioModel.update(req.params.id, req.body);
      if (!inventario) {
        return res.status(404).json({ error: 'Inventario no encontrado' });
      }
      res.json(inventario);
    } catch (error) {
      console.error('Error al actualizar inventario:', error);
      res.status(500).json({ error: 'Error al actualizar inventario' });
    }
  },

  async delete(req, res) {
    try {
      const inventario = await InventarioModel.delete(req.params.id);
      if (!inventario) {
        return res.status(404).json({ error: 'Inventario no encontrado' });
      }
      res.json({ message: 'Inventario eliminado correctamente' });
    } catch (error) {
      console.error('Error al eliminar inventario:', error);
      res.status(500).json({ error: 'Error al eliminar inventario' });
    }
  },

  async getByProducto(req, res) {
    try {
      const inventarios = await InventarioModel.findByProducto(req.params.producto_id);
      res.json(inventarios);
    } catch (error) {
      console.error('Error al obtener inventario por producto:', error);
      res.status(500).json({ error: 'Error al obtener inventario por producto' });
    }
  },

  async getByAlmacen(req, res) {
    try {
      const inventarios = await InventarioModel.findByAlmacen(req.params.almacen_id);
      res.json(inventarios);
    } catch (error) {
      console.error('Error al obtener inventario por almacén:', error);
      res.status(500).json({ error: 'Error al obtener inventario por almacén' });
    }
  }
};

module.exports = inventariosController;
