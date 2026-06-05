const pool = require('../database/connection');

class ProductoModel {
  static async findAll() {
    const result = await pool.query(`
      SELECT p.*, pr.nombre as proveedor_nombre
      FROM productos p
      LEFT JOIN proveedores pr ON p.proveedor_id = pr.id
      ORDER BY p.created_at DESC
    `);
    return result.rows;
  }

  static async findById(id) {
    const result = await pool.query(`
      SELECT p.*, pr.nombre as proveedor_nombre
      FROM productos p
      LEFT JOIN proveedores pr ON p.proveedor_id = pr.id
      WHERE p.id = $1
    `, [id]);
    return result.rows[0];
  }

  static async create(data) {
    const { nombre, descripcion, precio_unitario, stock_actual, stock_minimo, proveedor_id } = data;
    const result = await pool.query(
      'INSERT INTO productos (nombre, descripcion, precio_unitario, stock_actual, stock_minimo, proveedor_id) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
      [nombre, descripcion, precio_unitario, stock_actual || 0, stock_minimo || 10, proveedor_id]
    );
    return result.rows[0];
  }

  static async update(id, data) {
    const { nombre, descripcion, precio_unitario, stock_actual, stock_minimo, proveedor_id } = data;
    const result = await pool.query(
      'UPDATE productos SET nombre = $1, descripcion = $2, precio_unitario = $3, stock_actual = $4, stock_minimo = $5, proveedor_id = $6, updated_at = CURRENT_TIMESTAMP WHERE id = $7 RETURNING *',
      [nombre, descripcion, precio_unitario, stock_actual, stock_minimo, proveedor_id, id]
    );
    return result.rows[0];
  }

  static async delete(id) {
    const result = await pool.query('DELETE FROM productos WHERE id = $1 RETURNING *', [id]);
    return result.rows[0];
  }

  static async updateStock(id, cantidad) {
    const result = await pool.query(
      'UPDATE productos SET stock_actual = stock_actual + $1, updated_at = CURRENT_TIMESTAMP WHERE id = $2 RETURNING *',
      [cantidad, id]
    );
    return result.rows[0];
  }

  static async getLowStock() {
    const result = await pool.query(`
      SELECT p.*, pr.nombre as proveedor_nombre
      FROM productos p
      LEFT JOIN proveedores pr ON p.proveedor_id = pr.id
      WHERE p.stock_actual <= p.stock_minimo
      ORDER BY p.stock_actual ASC
    `);
    return result.rows;
  }
}

module.exports = ProductoModel;
