const pool = require('../database/connection');

class UsuarioModel {
  static async findAll() {
    const result = await pool.query(`
      SELECT u.id, u.nombre, u.email, u.rol_id, u.created_at, u.updated_at,
             r.nombre as rol_nombre, r.descripcion as rol_descripcion
      FROM usuarios u
      LEFT JOIN roles r ON u.rol_id = r.id
      ORDER BY u.created_at DESC
    `);
    return result.rows;
  }

  static async findById(id) {
    const result = await pool.query(`
      SELECT u.id, u.nombre, u.email, u.rol_id, u.created_at, u.updated_at,
             r.nombre as rol_nombre, r.descripcion as rol_descripcion
      FROM usuarios u
      LEFT JOIN roles r ON u.rol_id = r.id
      WHERE u.id = $1
    `, [id]);
    return result.rows[0];
  }

  static async findByEmail(email) {
    const result = await pool.query('SELECT * FROM usuarios WHERE email = $1', [email]);
    return result.rows[0];
  }

  static async create(data) {
    const { nombre, email, password_hash, rol_id } = data;
    const result = await pool.query(
      'INSERT INTO usuarios (nombre, email, password_hash, rol_id) VALUES ($1, $2, $3, $4) RETURNING *',
      [nombre, email, password_hash, rol_id]
    );
    return result.rows[0];
  }

  static async update(id, data) {
    const { nombre, email, rol_id } = data;
    const result = await pool.query(
      'UPDATE usuarios SET nombre = $1, email = $2, rol_id = $3, updated_at = CURRENT_TIMESTAMP WHERE id = $4 RETURNING *',
      [nombre, email, rol_id, id]
    );
    return result.rows[0];
  }

  static async delete(id) {
    const result = await pool.query('DELETE FROM usuarios WHERE id = $1 RETURNING *', [id]);
    return result.rows[0];
  }

  static async updatePassword(id, password_hash) {
    const result = await pool.query(
      'UPDATE usuarios SET password_hash = $1, updated_at = CURRENT_TIMESTAMP WHERE id = $2 RETURNING *',
      [password_hash, id]
    );
    return result.rows[0];
  }
}

module.exports = UsuarioModel;
