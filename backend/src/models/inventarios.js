const pool = require('../database/connection');

class InventarioModel {
  static async findAll() {
    const result = await pool.query(`
      SELECT i.*, p.nombre as producto_nombre, a.nombre as almacen_nombre
      FROM inventarios i
      LEFT JOIN productos p ON i.producto_id = p.id
      LEFT JOIN almacenes a ON i.almacen_id = a.id
      ORDER BY i.ultima_actualizacion DESC
    `);
    return result.rows;
  }

  static async findById(id) {
    const result = await pool.query(`
      SELECT i.*, p.nombre as producto_nombre, a.nombre as almacen_nombre
      FROM inventarios i
      LEFT JOIN productos p ON i.producto_id = p.id
      LEFT JOIN almacenes a ON i.almacen_id = a.id
      WHERE i.id = $1
    `, [id]);
    return result.rows[0];
  }

  static async findByProducto(producto_id) {
    const result = await pool.query(`
      SELECT i.*, p.nombre as producto_nombre, a.nombre as almacen_nombre
      FROM inventarios i
      LEFT JOIN productos p ON i.producto_id = p.id
      LEFT JOIN almacenes a ON i.almacen_id = a.id
      WHERE i.producto_id = $1
    `, [producto_id]);
    return result.rows;
  }

  static async findByAlmacen(almacen_id) {
    const result = await pool.query(`
      SELECT i.*, p.nombre as producto_nombre, a.nombre as almacen_nombre
      FROM inventarios i
      LEFT JOIN productos p ON i.producto_id = p.id
      LEFT JOIN almacenes a ON i.almacen_id = a.id
      WHERE i.almacen_id = $1
    `, [almacen_id]);
    return result.rows;
  }

  static async create(data) {
    const { producto_id, almacen_id, cantidad, ubicacion_estanteria } = data;
    const result = await pool.query(
      'INSERT INTO inventarios (producto_id, almacen_id, cantidad, ubicacion_estanteria) VALUES ($1, $2, $3, $4) ON CONFLICT (producto_id, almacen_id) DO UPDATE SET cantidad = inventarios.cantidad + $3, ubicacion_estanteria = $4, ultima_actualizacion = CURRENT_TIMESTAMP RETURNING *',
      [producto_id, almacen_id, cantidad || 0, ubicacion_estanteria]
    );
    return result.rows[0];
  }

  static async update(id, data) {
    const { cantidad, ubicacion_estanteria } = data;
    const result = await pool.query(
      'UPDATE inventarios SET cantidad = $1, ubicacion_estanteria = $2, ultima_actualizacion = CURRENT_TIMESTAMP WHERE id = $3 RETURNING *',
      [cantidad, ubicacion_estanteria, id]
    );
    return result.rows[0];
  }

  static async updateCantidad(producto_id, almacen_id, cantidad) {
    const result = await pool.query(
      'UPDATE inventarios SET cantidad = cantidad + $1, ultima_actualizacion = CURRENT_TIMESTAMP WHERE producto_id = $2 AND almacen_id = $3 RETURNING *',
      [cantidad, producto_id, almacen_id]
    );
    return result.rows[0];
  }

  static async delete(id) {
    const result = await pool.query('DELETE FROM inventarios WHERE id = $1 RETURNING *', [id]);
    return result.rows[0];
  }
}

module.exports = InventarioModel;
