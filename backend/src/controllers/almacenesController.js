const AlmacenModel = require('../models/almacenes');

const almacenesController = {
  async getAll(req, res) {
    try {
      const almacenes = await AlmacenModel.findAll();
      res.json(almacenes);
    } catch (error) {
      console.error('Error al obtener almacenes:', error);
      res.status(500).json({ error: 'Error al obtener almacenes' });
    }
  },

  async getById(req, res) {
    try {
      const almacen = await AlmacenModel.findById(req.params.id);
      if (!almacen) {
        return res.status(404).json({ error: 'Almacén no encontrado' });
      }
      res.json(almacen);
    } catch (error) {
      console.error('Error al obtener almacén:', error);
      res.status(500).json({ error: 'Error al obtener almacén' });
    }
  },

  async create(req, res) {
    try {
      const almacen = await AlmacenModel.create(req.body);
      res.status(201).json(almacen);
    } catch (error) {
      console.error('Error al crear almacén:', error);
      res.status(500).json({ error: 'Error al crear almacén' });
    }
  },

  async update(req, res) {
    try {
      const almacen = await AlmacenModel.update(req.params.id, req.body);
      if (!almacen) {
        return res.status(404).json({ error: 'Almacén no encontrado' });
      }
      res.json(almacen);
    } catch (error) {
      console.error('Error al actualizar almacén:', error);
      res.status(500).json({ error: 'Error al actualizar almacén' });
    }
  },

  async delete(req, res) {
    try {
      const almacen = await AlmacenModel.delete(req.params.id);
      if (!almacen) {
        return res.status(404).json({ error: 'Almacén no encontrado' });
      }
      res.json({ message: 'Almacén eliminado correctamente' });
    } catch (error) {
      console.error('Error al eliminar almacén:', error);
      res.status(500).json({ error: 'Error al eliminar almacén' });
    }
  }
};

module.exports = almacenesController;
