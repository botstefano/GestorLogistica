const CosteTransporteModel = require('../models/costesTransporte');
const CosteLogisticoModel = require('../models/costesLogisticos');
const AlertaSobrecosteModel = require('../models/alertasSobrecostes');
const ConfiguracionModel = require('../models/configuracion');

const costesTransporteController = {
  async getAll(req, res) {
    try {
      const costes = await CosteTransporteModel.findAll();
      res.json(costes);
    } catch (error) {
      console.error('Error al obtener costes de transporte:', error);
      res.status(500).json({ error: 'Error al obtener costes de transporte' });
    }
  },

  async getById(req, res) {
    try {
      const coste = await CosteTransporteModel.findById(req.params.id);
      if (!coste) {
        return res.status(404).json({ error: 'Coste de transporte no encontrado' });
      }
      res.json(coste);
    } catch (error) {
      console.error('Error al obtener coste de transporte:', error);
      res.status(500).json({ error: 'Error al obtener coste de transporte' });
    }
  },

  async create(req, res) {
    try {
      const usuario_registra_id = req.user.id;
      const data = { ...req.body, usuario_registra_id };
      
      const coste = await CosteTransporteModel.create(data);

      const totalTransporte = coste.coste_combustible + coste.coste_peajes + 
                           coste.coste_mantenimiento + coste.coste_conductor;

      await CosteLogisticoModel.create({
        operacion_referencia: `TRP-${coste.id}`,
        tipo_operacion: 'transporte',
        fecha: coste.fecha,
        monto_total: totalTransporte,
        desglose_json: {
          vehiculo_id: coste.vehiculo_id,
          ruta_origen: coste.ruta_origen,
          ruta_destino: coste.ruta_destino,
          kilometros_recorridos: coste.kilometros_recorridos,
          coste_combustible: coste.coste_combustible,
          coste_peajes: coste.coste_peajes,
          coste_mantenimiento: coste.coste_mantenimiento,
          coste_conductor: coste.coste_conductor
        }
      });

      const umbral = await ConfiguracionModel.getUmbralSobrecoste('transporte');
      const costeEsperadoPorKm = await ConfiguracionModel.findByClave('coste_estandar_km');
      const montoEsperado = (costeEsperadoPorKm ? parseFloat(costeEsperadoPorKm.valor) : 2.50) * coste.kilometros_recorridos;
      
      if (totalTransporte > montoEsperado * (1 + umbral / 100)) {
        await AlertaSobrecosteModel.create({
          tipo: 'transporte',
          monto_esperado: montoEsperado,
          monto_real: totalTransporte,
          diferencia: totalTransporte - montoEsperado,
          operacion_referencia: `TRP-${coste.id}`,
          usuario_notificado_id: req.user.id
        });
      }

      res.status(201).json(coste);
    } catch (error) {
      console.error('Error al crear coste de transporte:', error);
      res.status(500).json({ error: 'Error al crear coste de transporte' });
    }
  },

  async update(req, res) {
    try {
      const coste = await CosteTransporteModel.update(req.params.id, req.body);
      if (!coste) {
        return res.status(404).json({ error: 'Coste de transporte no encontrado' });
      }
      res.json(coste);
    } catch (error) {
      console.error('Error al actualizar coste de transporte:', error);
      res.status(500).json({ error: 'Error al actualizar coste de transporte' });
    }
  },

  async delete(req, res) {
    try {
      const coste = await CosteTransporteModel.delete(req.params.id);
      if (!coste) {
        return res.status(404).json({ error: 'Coste de transporte no encontrado' });
      }
      res.json({ message: 'Coste de transporte eliminado correctamente' });
    } catch (error) {
      console.error('Error al eliminar coste de transporte:', error);
      res.status(500).json({ error: 'Error al eliminar coste de transporte' });
    }
  },

  async getByVehiculo(req, res) {
    try {
      const costes = await CosteTransporteModel.getByVehiculo(req.params.vehiculo_id);
      res.json(costes);
    } catch (error) {
      console.error('Error al obtener costes por vehículo:', error);
      res.status(500).json({ error: 'Error al obtener costes por vehículo' });
    }
  },

  async getByFechaRange(req, res) {
    try {
      const { fecha_inicio, fecha_fin } = req.query;
      const costes = await CosteTransporteModel.getByFechaRange(fecha_inicio, fecha_fin);
      res.json(costes);
    } catch (error) {
      console.error('Error al obtener costes por rango de fechas:', error);
      res.status(500).json({ error: 'Error al obtener costes por rango de fechas' });
    }
  }
};

module.exports = costesTransporteController;
