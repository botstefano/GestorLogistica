const pool = require('../database/connection');

class CosteTransporteModel {
  static async findAll() {
    const result = await pool.query(`
      SELECT ct.*, v.placa, v.modelo as vehiculo_modelo, u.nombre as usuario_registra_nombre
      FROM costes_transporte ct
      LEFT JOIN vehiculos v ON ct.vehiculo_id = v.id
      LEFT JOIN usuarios u ON ct.usuario_registra_id = u.id
      ORDER BY ct.fecha DESC
    `);
    return result.rows;
  }

  static async findById(id) {
    const result = await pool.query(`
      SELECT ct.*, v.placa, v.modelo as vehiculo_modelo, u.nombre as usuario_registra_nombre
      FROM costes_transporte ct
      LEFT JOIN vehiculos v ON ct.vehiculo_id = v.id
      LEFT JOIN usuarios u ON ct.usuario_registra_id = u.id
      WHERE ct.id = $1
    `, [id]);
    return result.rows[0];
  }

  static async create(data) {
    const { vehiculo_id, fecha, ruta_origen, ruta_destino, kilometros_recorridos, coste_combustible, coste_peajes, coste_mantenimiento, coste_conductor, usuario_registra_id } = data;
    const result = await pool.query(
      'INSERT INTO costes_transporte (vehiculo_id, fecha, ruta_origen, ruta_destino, kilometros_recorridos, coste_combustible, coste_peajes, coste_mantenimiento, coste_conductor, usuario_registra_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *',
      [vehiculo_id, fecha, ruta_origen, ruta_destino, kilometros_recorridos, coste_combustible || 0, coste_peajes || 0, coste_mantenimiento || 0, coste_conductor || 0, usuario_registra_id]
    );
    return result.rows[0];
  }

  static async update(id, data) {
    const { vehiculo_id, fecha, ruta_origen, ruta_destino, kilometros_recorridos, coste_combustible, coste_peajes, coste_mantenimiento, coste_conductor } = data;
    const result = await pool.query(
      'UPDATE costes_transporte SET vehiculo_id = $1, fecha = $2, ruta_origen = $3, ruta_destino = $4, kilometros_recorridos = $5, coste_combustible = $6, coste_peajes = $7, coste_mantenimiento = $8, coste_conductor = $9 WHERE id = $10 RETURNING *',
      [vehiculo_id, fecha, ruta_origen, ruta_destino, kilometros_recorridos, coste_combustible, coste_peajes, coste_mantenimiento, coste_conductor, id]
    );
    return result.rows[0];
  }

  static async delete(id) {
    const result = await pool.query('DELETE FROM costes_transporte WHERE id = $1 RETURNING *', [id]);
    return result.rows[0];
  }

  static async getByVehiculo(vehiculo_id) {
    const result = await pool.query(`
      SELECT ct.*, v.placa, v.modelo as vehiculo_modelo, u.nombre as usuario_registra_nombre
      FROM costes_transporte ct
      LEFT JOIN vehiculos v ON ct.vehiculo_id = v.id
      LEFT JOIN usuarios u ON ct.usuario_registra_id = u.id
      WHERE ct.vehiculo_id = $1
      ORDER BY ct.fecha DESC
    `, [vehiculo_id]);
    return result.rows;
  }

  static async getByFechaRange(fecha_inicio, fecha_fin) {
    const result = await pool.query(`
      SELECT ct.*, v.placa, v.modelo as vehiculo_modelo, u.nombre as usuario_registra_nombre
      FROM costes_transporte ct
      LEFT JOIN vehiculos v ON ct.vehiculo_id = v.id
      LEFT JOIN usuarios u ON ct.usuario_registra_id = u.id
      WHERE ct.fecha BETWEEN $1 AND $2
      ORDER BY ct.fecha DESC
    `, [fecha_inicio, fecha_fin]);
    return result.rows;
  }

  static async getTotalByPeriod(fecha_inicio, fecha_fin) {
    const result = await pool.query(`
      SELECT 
        SUM(coste_combustible) as total_combustible,
        SUM(coste_peajes) as total_peajes,
        SUM(coste_mantenimiento) as total_mantenimiento,
        SUM(coste_conductor) as total_conductor,
        SUM(kilometros_recorridos) as total_kilometros,
        SUM(coste_combustible + coste_peajes + coste_mantenimiento + coste_conductor) as total_general
      FROM costes_transporte
      WHERE fecha BETWEEN $1 AND $2
    `, [fecha_inicio, fecha_fin]);
    return result.rows[0];
  }
}

module.exports = CosteTransporteModel;
