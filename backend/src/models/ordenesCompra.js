const pool = require('../database/connection');

class OrdenCompraModel {
  static async findAll() {
    const result = await pool.query(`
      SELECT oc.*, pr.nombre as proveedor_nombre, u.nombre as usuario_registra_nombre
      FROM ordenes_compra oc
      LEFT JOIN proveedores pr ON oc.proveedor_id = pr.id
      LEFT JOIN usuarios u ON oc.usuario_registra_id = u.id
      ORDER BY oc.created_at DESC
    `);
    return result.rows;
  }

  static async findById(id) {
    const result = await pool.query(`
      SELECT oc.*, pr.nombre as proveedor_nombre, u.nombre as usuario_registra_nombre
      FROM ordenes_compra oc
      LEFT JOIN proveedores pr ON oc.proveedor_id = pr.id
      LEFT JOIN usuarios u ON oc.usuario_registra_id = u.id
      WHERE oc.id = $1
    `, [id]);
    return result.rows[0];
  }

  static async create(data) {
    const { proveedor_id, fecha_entrega_esperada, usuario_registra_id } = data;
    const result = await pool.query(
      'INSERT INTO ordenes_compra (proveedor_id, fecha_entrega_esperada, usuario_registra_id) VALUES ($1, $2, $3) RETURNING *',
      [proveedor_id, fecha_entrega_esperada, usuario_registra_id]
    );
    return result.rows[0];
  }

  static async update(id, data) {
    const { proveedor_id, fecha_entrega_esperada, estado, total } = data;
    const result = await pool.query(
      'UPDATE ordenes_compra SET proveedor_id = $1, fecha_entrega_esperada = $2, estado = $3, total = $4, updated_at = CURRENT_TIMESTAMP WHERE id = $5 RETURNING *',
      [proveedor_id, fecha_entrega_esperada, estado, total, id]
    );
    return result.rows[0];
  }

  static async updateEstado(id, estado) {
    const result = await pool.query(
      'UPDATE ordenes_compra SET estado = $1, updated_at = CURRENT_TIMESTAMP WHERE id = $2 RETURNING *',
      [estado, id]
    );
    return result.rows[0];
  }

  static async updateTotal(id, total) {
    const result = await pool.query(
      'UPDATE ordenes_compra SET total = $1, updated_at = CURRENT_TIMESTAMP WHERE id = $2 RETURNING *',
      [total, id]
    );
    return result.rows[0];
  }

  static async delete(id) {
    const result = await pool.query('DELETE FROM ordenes_compra WHERE id = $1 RETURNING *', [id]);
    return result.rows[0];
  }

  static async getDetalles(orden_compra_id) {
    const result = await pool.query(`
      SELECT dc.*, p.nombre as producto_nombre
      FROM detalles_compra dc
      LEFT JOIN productos p ON dc.producto_id = p.id
      WHERE dc.orden_compra_id = $1
    `, [orden_compra_id]);
    return result.rows;
  }

  static async addDetalle(data) {
    const { orden_compra_id, producto_id, cantidad, precio_unitario, subtotal } = data;
    const result = await pool.query(
      'INSERT INTO detalles_compra (orden_compra_id, producto_id, cantidad, precio_unitario, subtotal) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [orden_compra_id, producto_id, cantidad, precio_unitario, subtotal]
    );
    return result.rows[0];
  }

  static async getByEstado(estado) {
    const result = await pool.query(`
      SELECT oc.*, pr.nombre as proveedor_nombre, u.nombre as usuario_registra_nombre
      FROM ordenes_compra oc
      LEFT JOIN proveedores pr ON oc.proveedor_id = pr.id
      LEFT JOIN usuarios u ON oc.usuario_registra_id = u.id
      WHERE oc.estado = $1
      ORDER BY oc.created_at DESC
    `, [estado]);
    return result.rows;
  }
}

module.exports = OrdenCompraModel;
