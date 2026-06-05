const ProductoModel = require('../models/productos');

const productosController = {
  async getAll(req, res) {
    try {
      const productos = await ProductoModel.findAll();
      res.json(productos);
    } catch (error) {
      console.error('Error al obtener productos:', error);
      res.status(500).json({ error: 'Error al obtener productos' });
    }
  },

  async getById(req, res) {
    try {
      const producto = await ProductoModel.findById(req.params.id);
      if (!producto) {
        return res.status(404).json({ error: 'Producto no encontrado' });
      }
      res.json(producto);
    } catch (error) {
      console.error('Error al obtener producto:', error);
      res.status(500).json({ error: 'Error al obtener producto' });
    }
  },

  async create(req, res) {
    try {
      const producto = await ProductoModel.create(req.body);
      res.status(201).json(producto);
    } catch (error) {
      console.error('Error al crear producto:', error);
      res.status(500).json({ error: 'Error al crear producto' });
    }
  },

  async update(req, res) {
    try {
      const producto = await ProductoModel.update(req.params.id, req.body);
      if (!producto) {
        return res.status(404).json({ error: 'Producto no encontrado' });
      }
      res.json(producto);
    } catch (error) {
      console.error('Error al actualizar producto:', error);
      res.status(500).json({ error: 'Error al actualizar producto' });
    }
  },

  async delete(req, res) {
    try {
      const producto = await ProductoModel.delete(req.params.id);
      if (!producto) {
        return res.status(404).json({ error: 'Producto no encontrado' });
      }
      res.json({ message: 'Producto eliminado correctamente' });
    } catch (error) {
      console.error('Error al eliminar producto:', error);
      res.status(500).json({ error: 'Error al eliminar producto' });
    }
  },

  async getLowStock(req, res) {
    try {
      const productos = await ProductoModel.getLowStock();
      res.json(productos);
    } catch (error) {
      console.error('Error al obtener productos con stock bajo:', error);
      res.status(500).json({ error: 'Error al obtener productos con stock bajo' });
    }
  }
};

module.exports = productosController;
