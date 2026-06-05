const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const UsuarioModel = require('../models/usuarios');

const authController = {
  async login(req, res) {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res.status(400).json({ error: 'Email y contraseña son requeridos' });
      }

      const usuario = await UsuarioModel.findByEmail(email);
      if (!usuario) {
        return res.status(401).json({ error: 'Credenciales inválidas' });
      }

      const passwordMatch = await bcrypt.compare(password, usuario.password_hash);
      if (!passwordMatch) {
        return res.status(401).json({ error: 'Credenciales inválidas' });
      }

      const token = jwt.sign(
        { id: usuario.id, email: usuario.email, rol: usuario.rol_id },
        process.env.JWT_SECRET || 'secret_key_logistica_2024',
        { expiresIn: '24h' }
      );

      const { password_hash, ...usuarioSinPassword } = usuario;

      res.json({
        token,
        usuario: usuarioSinPassword
      });
    } catch (error) {
      console.error('Error en login:', error);
      res.status(500).json({ error: 'Error al iniciar sesión' });
    }
  },

  async register(req, res) {
    try {
      const { nombre, email, password, rol_id } = req.body;

      if (!nombre || !email || !password) {
        return res.status(400).json({ error: 'Nombre, email y contraseña son requeridos' });
      }

      const existingUser = await UsuarioModel.findByEmail(email);
      if (existingUser) {
        return res.status(409).json({ error: 'El email ya está registrado' });
      }

      const password_hash = await bcrypt.hash(password, 10);
      const usuario = await UsuarioModel.create({
        nombre,
        email,
        password_hash,
        rol_id: rol_id || 2
      });

      const { password_hash: _, ...usuarioSinPassword } = usuario;

      res.status(201).json(usuarioSinPassword);
    } catch (error) {
      console.error('Error en registro:', error);
      res.status(500).json({ error: 'Error al registrar usuario' });
    }
  },

  async getProfile(req, res) {
    try {
      const usuario = await UsuarioModel.findById(req.user.id);
      if (!usuario) {
        return res.status(404).json({ error: 'Usuario no encontrado' });
      }

      const { password_hash, ...usuarioSinPassword } = usuario;
      res.json(usuarioSinPassword);
    } catch (error) {
      console.error('Error al obtener perfil:', error);
      res.status(500).json({ error: 'Error al obtener perfil' });
    }
  }
};

module.exports = authController;
