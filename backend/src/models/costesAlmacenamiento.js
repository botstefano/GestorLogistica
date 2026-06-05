const pool = require('../database/connection');

class CosteAlmacenamientoModel {
  static async findAll() {
    const result = await pool.query(`
      SELECT ca.*, a.nombre as almacen_nombre, u.nombre as usuario_registra_nombre
      FROM costes_almacenamiento ca
      LEFT JOIN almacenes a ON ca.almacen_id = a.id
      LEFT JOIN usuarios u ON ca.usuario_registra_id = u.id
      ORDER BY ca.fecha DESC
    `);
    return result.rows;
  }

  static async findById(id) {
    const result = await pool.query(`
      SELECT ca.*, a.nombre as almacen_nombre, u.nombre as usuario_registra_nombre
      FROM costes_almacenamiento ca
      LEFT JOIN almacenes a ON ca.almacen_id = a.id
      LEFT JOIN usuarios u ON ca.usuario_registra_id = u.id
      WHERE ca.id = $1
    `, [id]);
    return result.rows[0];
  }

  static async create(data) {
    const { almacen_id, fecha, concepto, monto, tipo_gasto, usuario_registra_id } = data;
    const result = await pool.query(
      'INSERT INTO costes_almacenamiento (almacen_id, fecha, concepto, monto, tipo_gasto, usuario_registra_id) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
      [almacen_id, fecha, concepto, monto, tipo_gasto, usuario_registra_id]
    );
    return result.rows[0];
  }

  static async update(id, data) {
    const { almacen_id, fecha, concepto, monto, tipo_gasto } = data;
    const result = await pool.query(
      'UPDATE costes_almacenamiento SET almacen_id = $1, fecha = $2, concepto = $3, monto = $4, tipo_gasto = $5 WHERE id = $6 RETURNING *',
      [almacen_id, fecha, concepto, monto, tipo_gasto, id]
    );
    return result.rows[0];
  }

  static async delete(id) {
    const result = await pool.query('DELETE FROM costes_almacenamiento WHERE id = $1 RETURNING *', [id]);
    return result.rows[0];
  }

  static async getByAlmacen(almacen_id) {
    const result = await pool.query(`
      SELECT ca.*, a.nombre as almacen_nombre, u.nombre as usuario_registra_nombre
      FROM costes_almacenamiento ca
      LEFT JOIN almacenes a ON ca.almacen_id = a.id
      LEFT JOIN usuarios u ON ca.usuario_registra_id = u.id
      WHERE ca.almacen_id = $1
      ORDER BY ca.fecha DESC
    `, [almacen_id]);
    return result.rows;
  }

  static async getByFechaRange(fecha_inicio, fecha_fin) {
    const result = await pool.query(`
      SELECT ca.*, a.nombre as almacen_nombre, u.nombre as usuario_registra_nombre
      FROM costes_almacenamiento ca
      LEFT JOIN almacenes a ON ca.almacen_id = a.id
      LEFT JOIN usuarios u ON ca.usuario_registra_id = u.id
      WHERE ca.fecha BETWEEN $1 AND $2
      ORDER BY ca.fecha DESC
    `, [fecha_inicio, fecha_fin]);
    return result.rows;
  }

  static async getTotalByPeriod(fecha_inicio, fecha_fin) {
    const result = await pool.query(`
      SELECT SUM(monto) as total, tipo_gasto
      FROM costes_almacenamiento
      WHERE fecha BETWEEN $1 AND $2
      GROUP BY tipo_gasto
    `, [fecha_inicio, fecha_fin]);
    return result.rows;
  }
}

module.exports = CosteAlmacenamientoModel;
