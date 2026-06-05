const pool = require('../database/connection');

class ProveedorModel {
  static async findAll() {
    const result = await pool.query('SELECT * FROM proveedores ORDER BY created_at DESC');
    return result.rows;
  }

  static async findById(id) {
    const result = await pool.query('SELECT * FROM proveedores WHERE id = $1', [id]);
    return result.rows[0];
  }

  static async create(data) {
    const { nombre, contacto, telefono, email, direccion } = data;
    const result = await pool.query(
      'INSERT INTO proveedores (nombre, contacto, telefono, email, direccion) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [nombre, contacto, telefono, email, direccion]
    );
    return result.rows[0];
  }

  static async update(id, data) {
    const { nombre, contacto, telefono, email, direccion } = data;
    const result = await pool.query(
      'UPDATE proveedores SET nombre = $1, contacto = $2, telefono = $3, email = $4, direccion = $5, updated_at = CURRENT_TIMESTAMP WHERE id = $6 RETURNING *',
      [nombre, contacto, telefono, email, direccion, id]
    );
    return result.rows[0];
  }

  static async delete(id) {
    const result = await pool.query('DELETE FROM proveedores WHERE id = $1 RETURNING *', [id]);
    return result.rows[0];
  }
}

module.exports = ProveedorModel;
