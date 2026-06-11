const CosteLogisticoModel = require('../models/costesLogisticos');

const costesLogisticosController = {
  async getAll(req, res) {
    try {
      const costes = await CosteLogisticoModel.findAll();
      res.json(costes);
    } catch (error) {
      console.error('Error al obtener costes logísticos:', error);
      res.status(500).json({ error: 'Error al obtener costes logísticos' });
    }
  },

  async getById(req, res) {
    try {
      const coste = await CosteLogisticoModel.findById(req.params.id);
      if (!coste) {
        return res.status(404).json({ error: 'Coste logístico no encontrado' });
      }
      res.json(coste);
    } catch (error) {
      console.error('Error al obtener coste logístico:', error);
      res.status(500).json({ error: 'Error al obtener coste logístico' });
    }
  },

  async create(req, res) {
    try {
      const coste = await CosteLogisticoModel.create(req.body);
      res.status(201).json(coste);
    } catch (error) {
      console.error('Error al crear coste logístico:', error);
      res.status(500).json({ error: 'Error al crear coste logístico' });
    }
  },

  async getByTipo(req, res) {
    try {
      const costes = await CosteLogisticoModel.getByTipo(req.params.tipo);
      res.json(costes);
    } catch (error) {
      console.error('Error al obtener costes por tipo:', error);
      res.status(500).json({ error: 'Error al obtener costes por tipo' });
    }
  },

  async getByFechaRange(req, res) {
    try {
      const { fecha_inicio, fecha_fin } = req.query;
      const costes = await CosteLogisticoModel.getByFechaRange(fecha_inicio, fecha_fin);
      res.json(costes);
    } catch (error) {
      console.error('Error al obtener costes por rango de fechas:', error);
      res.status(500).json({ error: 'Error al obtener costes por rango de fechas' });
    }
  }
};

module.exports = costesLogisticosController;
