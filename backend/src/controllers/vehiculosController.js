const VehiculoModel = require('../models/vehiculos');

const vehiculosController = {
  async getAll(req, res) {
    try {
      const vehiculos = await VehiculoModel.findAll();
      res.json(vehiculos);
    } catch (error) {
      console.error('Error al obtener vehículos:', error);
      res.status(500).json({ error: 'Error al obtener vehículos' });
    }
  },

  async getById(req, res) {
    try {
      const vehiculo = await VehiculoModel.findById(req.params.id);
      if (!vehiculo) {
        return res.status(404).json({ error: 'Vehículo no encontrado' });
      }
      res.json(vehiculo);
    } catch (error) {
      console.error('Error al obtener vehículo:', error);
      res.status(500).json({ error: 'Error al obtener vehículo' });
    }
  },

  async create(req, res) {
    try {
      const vehiculo = await VehiculoModel.create(req.body);
      res.status(201).json(vehiculo);
    } catch (error) {
      console.error('Error al crear vehículo:', error);
      res.status(500).json({ error: 'Error al crear vehículo' });
    }
  },

  async update(req, res) {
    try {
      const vehiculo = await VehiculoModel.update(req.params.id, req.body);
      if (!vehiculo) {
        return res.status(404).json({ error: 'Vehículo no encontrado' });
      }
      res.json(vehiculo);
    } catch (error) {
      console.error('Error al actualizar vehículo:', error);
      res.status(500).json({ error: 'Error al actualizar vehículo' });
    }
  },

  async delete(req, res) {
    try {
      const vehiculo = await VehiculoModel.delete(req.params.id);
      if (!vehiculo) {
        return res.status(404).json({ error: 'Vehículo no encontrado' });
      }
      res.json({ message: 'Vehículo eliminado correctamente' });
    } catch (error) {
      console.error('Error al eliminar vehículo:', error);
      res.status(500).json({ error: 'Error al eliminar vehículo' });
    }
  },

  async getActivos(req, res) {
    try {
      const vehiculos = await VehiculoModel.getActivos();
      res.json(vehiculos);
    } catch (error) {
      console.error('Error al obtener vehículos activos:', error);
      res.status(500).json({ error: 'Error al obtener vehículos activos' });
    }
  }
};

module.exports = vehiculosController;
