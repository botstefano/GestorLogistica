const pool = require('../database/connection');

class AuditoriaModel {
  static async findAll() {
    const result = await pool.query(`
      SELECT a.*, u.nombre as usuario_nombre
      FROM auditorias a
      LEFT JOIN usuarios u ON a.usuario_id = u.id
      ORDER BY a.fecha_cambio DESC
      LIMIT 100
    `);
    return result.rows;
  }

  static async findById(id) {
    const result = await pool.query(`
      SELECT a.*, u.nombre as usuario_nombre
      FROM auditorias a
      LEFT JOIN usuarios u ON a.usuario_id = u.id
      WHERE a.id = $1
    `, [id]);
    return result.rows[0];
  }

  static async create(data) {
    const { usuario_id, accion, tabla_afectada, registro_id, datos_anteriores_json } = data;
    const result = await pool.query(
      'INSERT INTO auditorias (usuario_id, accion, tabla_afectada, registro_id, datos_anteriores_json) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [usuario_id, accion, tabla_afectada, registro_id, JSON.stringify(datos_anteriores_json)]
    );
    return result.rows[0];
  }

  static async getByUsuario(usuario_id) {
    const result = await pool.query(`
      SELECT a.*, u.nombre as usuario_nombre
      FROM auditorias a
      LEFT JOIN usuarios u ON a.usuario_id = u.id
      WHERE a.usuario_id = $1
      ORDER BY a.fecha_cambio DESC
    `, [usuario_id]);
    return result.rows;
  }

  static async getByTabla(tabla_afectada) {
    const result = await pool.query(`
      SELECT a.*, u.nombre as usuario_nombre
      FROM auditorias a
      LEFT JOIN usuarios u ON a.usuario_id = u.id
      WHERE a.tabla_afectada = $1
      ORDER BY a.fecha_cambio DESC
    `, [tabla_afectada]);
    return result.rows;
  }

  static async getByFechaRange(fecha_inicio, fecha_fin) {
    const result = await pool.query(`
      SELECT a.*, u.nombre as usuario_nombre
      FROM auditorias a
      LEFT JOIN usuarios u ON a.usuario_id = u.id
      WHERE a.fecha_cambio BETWEEN $1 AND $2
      ORDER BY a.fecha_cambio DESC
    `, [fecha_inicio, fecha_fin]);
    return result.rows;
  }
}

module.exports = AuditoriaModel;
