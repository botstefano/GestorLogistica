const pool = require('../database/connection');

class AlertaSobrecosteModel {
  static async findAll() {
    const result = await pool.query(`
      SELECT aso.*, u.nombre as usuario_notificado_nombre
      FROM alertas_sobrecostes aso
      LEFT JOIN usuarios u ON aso.usuario_notificado_id = u.id
      ORDER BY aso.fecha DESC
    `);
    return result.rows;
  }

  static async findById(id) {
    const result = await pool.query(`
      SELECT aso.*, u.nombre as usuario_notificado_nombre
      FROM alertas_sobrecostes aso
      LEFT JOIN usuarios u ON aso.usuario_notificado_id = u.id
      WHERE aso.id = $1
    `, [id]);
    return result.rows[0];
  }

  static async create(data) {
    const { tipo, monto_esperado, monto_real, diferencia, operacion_referencia, usuario_notificado_id } = data;
    const result = await pool.query(
      'INSERT INTO alertas_sobrecostes (tipo, monto_esperado, monto_real, diferencia, operacion_referencia, usuario_notificado_id) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
      [tipo, monto_esperado, monto_real, diferencia, operacion_referencia, usuario_notificado_id]
    );
    return result.rows[0];
  }

  static async updateEstado(id, estado) {
    const result = await pool.query(
      'UPDATE alertas_sobrecostes SET estado = $1 WHERE id = $2 RETURNING *',
      [estado, id]
    );
    return result.rows[0];
  }

  static async getActivas() {
    const result = await pool.query(`
      SELECT aso.*, u.nombre as usuario_notificado_nombre
      FROM alertas_sobrecostes aso
      LEFT JOIN usuarios u ON aso.usuario_notificado_id = u.id
      WHERE aso.estado = $1
      ORDER BY aso.fecha DESC
    `, ['activa']);
    return result.rows;
  }

  static async getByTipo(tipo) {
    const result = await pool.query(`
      SELECT aso.*, u.nombre as usuario_notificado_nombre
      FROM alertas_sobrecostes aso
      LEFT JOIN usuarios u ON aso.usuario_notificado_id = u.id
      WHERE aso.tipo = $1
      ORDER BY aso.fecha DESC
    `, [tipo]);
    return result.rows;
  }
}

module.exports = AlertaSobrecosteModel;
