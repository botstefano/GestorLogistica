const CosteAlmacenamientoModel = require('../models/costesAlmacenamiento');
const CosteLogisticoModel = require('../models/costesLogisticos');
const AlertaSobrecosteModel = require('../models/alertasSobrecostes');
const ConfiguracionModel = require('../models/configuracion');

const costesAlmacenamientoController = {
  async getAll(req, res) {
    try {
      const costes = await CosteAlmacenamientoModel.findAll();
      res.json(costes);
    } catch (error) {
      console.error('Error al obtener costes de almacenamiento:', error);
      res.status(500).json({ error: 'Error al obtener costes de almacenamiento' });
    }
  },

  async getById(req, res) {
    try {
      const coste = await CosteAlmacenamientoModel.findById(req.params.id);
      if (!coste) {
        return res.status(404).json({ error: 'Coste de almacenamiento no encontrado' });
      }
      res.json(coste);
    } catch (error) {
      console.error('Error al obtener coste de almacenamiento:', error);
      res.status(500).json({ error: 'Error al obtener coste de almacenamiento' });
    }
  },

  async create(req, res) {
    try {
      const usuario_registra_id = req.user.id;
      const data = { ...req.body, usuario_registra_id };
      
      const coste = await CosteAlmacenamientoModel.create(data);

      await CosteLogisticoModel.create({
        operacion_referencia: `ALM-${coste.id}`,
        tipo_operacion: 'almacenamiento',
        fecha: coste.fecha,
        monto_total: coste.monto,
        desglose_json: {
          almacen_id: coste.almacen_id,
          concepto: coste.concepto,
          tipo_gasto: coste.tipo_gasto
        }
      });

      const umbral = await ConfiguracionModel.getUmbralSobrecoste('almacenamiento');
      const montoEsperado = coste.monto * (1 - umbral / 100);
      
      if (coste.monto > montoEsperado * 1.5) {
        await AlertaSobrecosteModel.create({
          tipo: 'almacenamiento',
          monto_esperado: montoEsperado,
          monto_real: coste.monto,
          diferencia: coste.monto - montoEsperado,
          operacion_referencia: `ALM-${coste.id}`,
          usuario_notificado_id: req.user.id
        });
      }

      res.status(201).json(coste);
    } catch (error) {
      console.error('Error al crear coste de almacenamiento:', error);
      res.status(500).json({ error: 'Error al crear coste de almacenamiento' });
    }
  },

  async update(req, res) {
    try {
      const coste = await CosteAlmacenamientoModel.update(req.params.id, req.body);
      if (!coste) {
        return res.status(404).json({ error: 'Coste de almacenamiento no encontrado' });
      }
      res.json(coste);
    } catch (error) {
      console.error('Error al actualizar coste de almacenamiento:', error);
      res.status(500).json({ error: 'Error al actualizar coste de almacenamiento' });
    }
  },

  async delete(req, res) {
    try {
      const coste = await CosteAlmacenamientoModel.delete(req.params.id);
      if (!coste) {
        return res.status(404).json({ error: 'Coste de almacenamiento no encontrado' });
      }
      res.json({ message: 'Coste de almacenamiento eliminado correctamente' });
    } catch (error) {
      console.error('Error al eliminar coste de almacenamiento:', error);
      res.status(500).json({ error: 'Error al eliminar coste de almacenamiento' });
    }
  },

  async getByAlmacen(req, res) {
    try {
      const costes = await CosteAlmacenamientoModel.getByAlmacen(req.params.almacen_id);
      res.json(costes);
    } catch (error) {
      console.error('Error al obtener costes por almacén:', error);
      res.status(500).json({ error: 'Error al obtener costes por almacén' });
    }
  },

  async getByFechaRange(req, res) {
    try {
      const { fecha_inicio, fecha_fin } = req.query;
      const costes = await CosteAlmacenamientoModel.getByFechaRange(fecha_inicio, fecha_fin);
      res.json(costes);
    } catch (error) {
      console.error('Error al obtener costes por rango de fechas:', error);
      res.status(500).json({ error: 'Error al obtener costes por rango de fechas' });
    }
  }
};

module.exports = costesAlmacenamientoController;
