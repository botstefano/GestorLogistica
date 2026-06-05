const pool = require('../database/connection');

class VehiculoModel {
  static async findAll() {
    const result = await pool.query('SELECT * FROM vehiculos ORDER BY created_at DESC');
    return result.rows;
  }

  static async findById(id) {
    const result = await pool.query('SELECT * FROM vehiculos WHERE id = $1', [id]);
    return result.rows[0];
  }

  static async create(data) {
    const { placa, modelo, capacidad_carga, coste_por_km, estado } = data;
    const result = await pool.query(
      'INSERT INTO vehiculos (placa, modelo, capacidad_carga, coste_por_km, estado) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [placa, modelo, capacidad_carga, coste_por_km || 0, estado || 'activo']
    );
    return result.rows[0];
  }

  static async update(id, data) {
    const { placa, modelo, capacidad_carga, coste_por_km, estado } = data;
    const result = await pool.query(
      'UPDATE vehiculos SET placa = $1, modelo = $2, capacidad_carga = $3, coste_por_km = $4, estado = $5, updated_at = CURRENT_TIMESTAMP WHERE id = $6 RETURNING *',
      [placa, modelo, capacidad_carga, coste_por_km, estado, id]
    );
    return result.rows[0];
  }

  static async delete(id) {
    const result = await pool.query('DELETE FROM vehiculos WHERE id = $1 RETURNING *', [id]);
    return result.rows[0];
  }

  static async getActivos() {
    const result = await pool.query('SELECT * FROM vehiculos WHERE estado = $1', ['activo']);
    return result.rows;
  }
}

module.exports = VehiculoModel;
