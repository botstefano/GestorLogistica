const pool = require('../database/connection');

class ConfiguracionModel {
  static async findAll() {
    const result = await pool.query('SELECT * FROM configuracion ORDER BY clave');
    return result.rows;
  }

  static async findByClave(clave) {
    const result = await pool.query('SELECT * FROM configuracion WHERE clave = $1', [clave]);
    return result.rows[0];
  }

  static async update(clave, valor) {
    const result = await pool.query(
      'UPDATE configuracion SET valor = $1, updated_at = CURRENT_TIMESTAMP WHERE clave = $2 RETURNING *',
      [valor, clave]
    );
    return result.rows[0];
  }

  static async getUmbralSobrecoste(tipo) {
    const clave = `umbral_sobrecoste_${tipo}`;
    const result = await pool.query('SELECT valor FROM configuracion WHERE clave = $1', [clave]);
    if (result.rows[0]) {
      return parseFloat(result.rows[0].valor);
    }
    return 20; // Default 20%
  }
}

module.exports = ConfiguracionModel;
