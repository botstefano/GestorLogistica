const pool = require('../database/connection');

class AlmacenModel {
  static async findAll() {
    const result = await pool.query('SELECT * FROM almacenes ORDER BY created_at DESC');
    return result.rows;
  }

  static async findById(id) {
    const result = await pool.query('SELECT * FROM almacenes WHERE id = $1', [id]);
    return result.rows[0];
  }

  static async create(data) {
    const { nombre, ubicacion, capacidad_total, coste_mensual_operacion } = data;
    const result = await pool.query(
      'INSERT INTO almacenes (nombre, ubicacion, capacidad_total, coste_mensual_operacion) VALUES ($1, $2, $3, $4) RETURNING *',
      [nombre, ubicacion, capacidad_total, coste_mensual_operacion || 0]
    );
    return result.rows[0];
  }

  static async update(id, data) {
    const { nombre, ubicacion, capacidad_total, coste_mensual_operacion } = data;
    const result = await pool.query(
      'UPDATE almacenes SET nombre = $1, ubicacion = $2, capacidad_total = $3, coste_mensual_operacion = $4, updated_at = CURRENT_TIMESTAMP WHERE id = $5 RETURNING *',
      [nombre, ubicacion, capacidad_total, coste_mensual_operacion, id]
    );
    return result.rows[0];
  }

  static async delete(id) {
    const result = await pool.query('DELETE FROM almacenes WHERE id = $1 RETURNING *', [id]);
    return result.rows[0];
  }
}

module.exports = AlmacenModel;
