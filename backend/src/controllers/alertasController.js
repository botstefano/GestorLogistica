const AlertaSobrecosteModel = require('../models/alertasSobrecostes');

const alertasController = {
  async getAll(req, res) {
    try {
      const alertas = await AlertaSobrecosteModel.findAll();
      res.json(alertas);
    } catch (error) {
      console.error('Error al obtener alertas:', error);
      res.status(500).json({ error: 'Error al obtener alertas' });
    }
  },

  async getActivas(req, res) {
    try {
      const alertas = await AlertaSobrecosteModel.getActivas();
      res.json(alertas);
    } catch (error) {
      console.error('Error al obtener alertas activas:', error);
      res.status(500).json({ error: 'Error al obtener alertas activas' });
    }
  },

  async getById(req, res) {
    try {
      const alerta = await AlertaSobrecosteModel.findById(req.params.id);
      if (!alerta) {
        return res.status(404).json({ error: 'Alerta no encontrada' });
      }
      res.json(alerta);
    } catch (error) {
      console.error('Error al obtener alerta:', error);
      res.status(500).json({ error: 'Error al obtener alerta' });
    }
  },

  async updateEstado(req, res) {
    try {
      const { estado } = req.body;
      const alerta = await AlertaSobrecosteModel.updateEstado(req.params.id, estado);
      if (!alerta) {
        return res.status(404).json({ error: 'Alerta no encontrada' });
      }
      res.json(alerta);
    } catch (error) {
      console.error('Error al actualizar estado de alerta:', error);
      res.status(500).json({ error: 'Error al actualizar estado de alerta' });
    }
  }
};

module.exports = alertasController;
