const DistribucionModel = require('../models/distribuciones');

const distribucionesController = {
  async getAll(req, res) {
    try {
      const distribuciones = await DistribucionModel.findAll();
      res.json(distribuciones);
    } catch (error) {
      console.error('Error al obtener distribuciones:', error);
      res.status(500).json({ error: 'Error al obtener distribuciones' });
    }
  },

  async getById(req, res) {
    try {
      const distribucion = await DistribucionModel.findById(req.params.id);
      if (!distribucion) {
        return res.status(404).json({ error: 'Distribución no encontrada' });
      }
      res.json(distribucion);
    } catch (error) {
      console.error('Error al obtener distribución:', error);
      res.status(500).json({ error: 'Error al obtener distribución' });
    }
  },

  async create(req, res) {
    try {
      const usuario_registra_id = req.user.id;
      const data = { ...req.body, usuario_registra_id };
      
      const distribucion = await DistribucionModel.create(data);
      res.status(201).json(distribucion);
    } catch (error) {
      console.error('Error al crear distribución:', error);
      res.status(500).json({ error: 'Error al crear distribución' });
    }
  },

  async update(req, res) {
    try {
      const distribucion = await DistribucionModel.update(req.params.id, req.body);
      if (!distribucion) {
        return res.status(404).json({ error: 'Distribución no encontrada' });
      }
      res.json(distribucion);
    } catch (error) {
      console.error('Error al actualizar distribución:', error);
      res.status(500).json({ error: 'Error al actualizar distribución' });
    }
  },

  async updateEstado(req, res) {
    try {
      const { estado } = req.body;
      const distribucion = await DistribucionModel.updateEstado(req.params.id, estado);
      if (!distribucion) {
        return res.status(404).json({ error: 'Distribución no encontrada' });
      }
      res.json(distribucion);
    } catch (error) {
      console.error('Error al actualizar estado de distribución:', error);
      res.status(500).json({ error: 'Error al actualizar estado de distribución' });
    }
  },

  async delete(req, res) {
    try {
      const distribucion = await DistribucionModel.delete(req.params.id);
      if (!distribucion) {
        return res.status(404).json({ error: 'Distribución no encontrada' });
      }
      res.json({ message: 'Distribución eliminada correctamente' });
    } catch (error) {
      console.error('Error al eliminar distribución:', error);
      res.status(500).json({ error: 'Error al eliminar distribución' });
    }
  },

  async getByEstado(req, res) {
    try {
      const distribuciones = await DistribucionModel.getByEstado(req.params.estado);
      res.json(distribuciones);
    } catch (error) {
      console.error('Error al obtener distribuciones por estado:', error);
      res.status(500).json({ error: 'Error al obtener distribuciones por estado' });
    }
  }
};

module.exports = distribucionesController;
