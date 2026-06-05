const pool = require('../database/connection');

class CosteLogisticoModel {
  static async findAll() {
    const result = await pool.query('SELECT * FROM costes_logisticos_totales ORDER BY fecha DESC');
    return result.rows;
  }

  static async findById(id) {
    const result = await pool.query('SELECT * FROM costes_logisticos_totales WHERE id = $1', [id]);
    return result.rows[0];
  }

  static async create(data) {
    const { operacion_referencia, tipo_operacion, fecha, monto_total, desglose_json } = data;
    const result = await pool.query(
      'INSERT INTO costes_logisticos_totales (operacion_referencia, tipo_operacion, fecha, monto_total, desglose_json) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [operacion_referencia, tipo_operacion, fecha, monto_total, JSON.stringify(desglose_json)]
    );
    return result.rows[0];
  }

  static async getByTipo(tipo_operacion) {
    const result = await pool.query(
      'SELECT * FROM costes_logisticos_totales WHERE tipo_operacion = $1 ORDER BY fecha DESC',
      [tipo_operacion]
    );
    return result.rows;
  }

  static async getByFechaRange(fecha_inicio, fecha_fin) {
    const result = await pool.query(
      'SELECT * FROM costes_logisticos_totales WHERE fecha BETWEEN $1 AND $2 ORDER BY fecha DESC',
      [fecha_inicio, fecha_fin]
    );
    return result.rows;
  }

  static async getTotalByPeriod(fecha_inicio, fecha_fin) {
    const result = await pool.query(`
      SELECT 
        SUM(monto_total) as total_general,
        tipo_operacion,
        COUNT(*) as cantidad_operaciones
      FROM costes_logisticos_totales
      WHERE fecha BETWEEN $1 AND $2
      GROUP BY tipo_operacion
    `, [fecha_inicio, fecha_fin]);
    return result.rows;
  }

  static async getGrandTotal(fecha_inicio, fecha_fin) {
    const result = await pool.query(`
      SELECT SUM(monto_total) as total
      FROM costes_logisticos_totales
      WHERE fecha BETWEEN $1 AND $2
    `, [fecha_inicio, fecha_fin]);
    return result.rows[0];
  }
}

module.exports = CosteLogisticoModel;
