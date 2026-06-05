const AuditoriaModel = require('../models/auditorias');

const auditoriasController = {
  async getAll(req, res) {
    try {
      const auditorias = await AuditoriaModel.findAll();
      res.json(auditorias);
    } catch (error) {
      console.error('Error al obtener auditorías:', error);
      res.status(500).json({ error: 'Error al obtener auditorías' });
    }
  },

  async getById(req, res) {
    try {
      const auditoria = await AuditoriaModel.findById(req.params.id);
      if (!auditoria) {
        return res.status(404).json({ error: 'Auditoría no encontrada' });
      }
      res.json(auditoria);
    } catch (error) {
      console.error('Error al obtener auditoría:', error);
      res.status(500).json({ error: 'Error al obtener auditoría' });
    }
  },

  async getByUsuario(req, res) {
    try {
      const auditorias = await AuditoriaModel.getByUsuario(req.params.usuario_id);
      res.json(auditorias);
    } catch (error) {
      console.error('Error al obtener auditorías por usuario:', error);
      res.status(500).json({ error: 'Error al obtener auditorías por usuario' });
    }
  },

  async getByTabla(req, res) {
    try {
      const auditorias = await AuditoriaModel.getByTabla(req.params.tabla);
      res.json(auditorias);
    } catch (error) {
      console.error('Error al obtener auditorías por tabla:', error);
      res.status(500).json({ error: 'Error al obtener auditorías por tabla' });
    }
  }
};

module.exports = auditoriasController;
