const pool = require('../database/connection');

class DistribucionModel {
  static async findAll() {
    const result = await pool.query(`
      SELECT d.*, oc.id as orden_compra_id, v.placa, v.modelo as vehiculo_modelo, u.nombre as usuario_registra_nombre
      FROM distribuciones d
      LEFT JOIN ordenes_compra oc ON d.orden_compra_id = oc.id
      LEFT JOIN vehiculos v ON d.vehiculo_id = v.id
      LEFT JOIN usuarios u ON d.usuario_registra_id = u.id
      ORDER BY d.created_at DESC
    `);
    return result.rows;
  }

  static async findById(id) {
    const result = await pool.query(`
      SELECT d.*, oc.id as orden_compra_id, v.placa, v.modelo as vehiculo_modelo, u.nombre as usuario_registra_nombre
      FROM distribuciones d
      LEFT JOIN ordenes_compra oc ON d.orden_compra_id = oc.id
      LEFT JOIN vehiculos v ON d.vehiculo_id = v.id
      LEFT JOIN usuarios u ON d.usuario_registra_id = u.id
      WHERE d.id = $1
    `, [id]);
    return result.rows[0];
  }

  static async create(data) {
    const { orden_compra_id, vehiculo_id, fecha_salida, fecha_entrega, estado, coste_total_transporte, usuario_registra_id } = data;
    const result = await pool.query(
      'INSERT INTO distribuciones (orden_compra_id, vehiculo_id, fecha_salida, fecha_entrega, estado, coste_total_transporte, usuario_registra_id) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
      [orden_compra_id, vehiculo_id, fecha_salida, fecha_entrega, estado || 'pendiente', coste_total_transporte || 0, usuario_registra_id]
    );
    return result.rows[0];
  }

  static async update(id, data) {
    const { orden_compra_id, vehiculo_id, fecha_salida, fecha_entrega, estado, coste_total_transporte } = data;
    const result = await pool.query(
      'UPDATE distribuciones SET orden_compra_id = $1, vehiculo_id = $2, fecha_salida = $3, fecha_entrega = $4, estado = $5, coste_total_transporte = $6, updated_at = CURRENT_TIMESTAMP WHERE id = $7 RETURNING *',
      [orden_compra_id, vehiculo_id, fecha_salida, fecha_entrega, estado, coste_total_transporte, id]
    );
    return result.rows[0];
  }

  static async updateEstado(id, estado) {
    const result = await pool.query(
      'UPDATE distribuciones SET estado = $1, updated_at = CURRENT_TIMESTAMP WHERE id = $2 RETURNING *',
      [estado, id]
    );
    return result.rows[0];
  }

  static async delete(id) {
    const result = await pool.query('DELETE FROM distribuciones WHERE id = $1 RETURNING *', [id]);
    return result.rows[0];
  }

  static async getByEstado(estado) {
    const result = await pool.query(`
      SELECT d.*, oc.id as orden_compra_id, v.placa, v.modelo as vehiculo_modelo, u.nombre as usuario_registra_nombre
      FROM distribuciones d
      LEFT JOIN ordenes_compra oc ON d.orden_compra_id = oc.id
      LEFT JOIN vehiculos v ON d.vehiculo_id = v.id
      LEFT JOIN usuarios u ON d.usuario_registra_id = u.id
      WHERE d.estado = $1
      ORDER BY d.created_at DESC
    `, [estado]);
    return result.rows;
  }
}

module.exports = DistribucionModel;
