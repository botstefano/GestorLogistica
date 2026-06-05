const ProveedorModel = require('../models/proveedores');

const proveedoresController = {
  async getAll(req, res) {
    try {
      const proveedores = await ProveedorModel.findAll();
      res.json(proveedores);
    } catch (error) {
      console.error('Error al obtener proveedores:', error);
      res.status(500).json({ error: 'Error al obtener proveedores' });
    }
  },

  async getById(req, res) {
    try {
      const proveedor = await ProveedorModel.findById(req.params.id);
      if (!proveedor) {
        return res.status(404).json({ error: 'Proveedor no encontrado' });
      }
      res.json(proveedor);
    } catch (error) {
      console.error('Error al obtener proveedor:', error);
      res.status(500).json({ error: 'Error al obtener proveedor' });
    }
  },

  async create(req, res) {
    try {
      const proveedor = await ProveedorModel.create(req.body);
      res.status(201).json(proveedor);
    } catch (error) {
      console.error('Error al crear proveedor:', error);
      res.status(500).json({ error: 'Error al crear proveedor' });
    }
  },

  async update(req, res) {
    try {
      const proveedor = await ProveedorModel.update(req.params.id, req.body);
      if (!proveedor) {
        return res.status(404).json({ error: 'Proveedor no encontrado' });
      }
      res.json(proveedor);
    } catch (error) {
      console.error('Error al actualizar proveedor:', error);
      res.status(500).json({ error: 'Error al actualizar proveedor' });
    }
  },

  async delete(req, res) {
    try {
      const proveedor = await ProveedorModel.delete(req.params.id);
      if (!proveedor) {
        return res.status(404).json({ error: 'Proveedor no encontrado' });
      }
      res.json({ message: 'Proveedor eliminado correctamente' });
    } catch (error) {
      console.error('Error al eliminar proveedor:', error);
      res.status(500).json({ error: 'Error al eliminar proveedor' });
    }
  }
};

module.exports = proveedoresController;
