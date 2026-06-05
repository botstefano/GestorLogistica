const UsuarioModel = require('../models/usuarios');

const usuariosController = {
  async getAll(req, res) {
    try {
      const usuarios = await UsuarioModel.findAll();
      res.json(usuarios);
    } catch (error) {
      console.error('Error al obtener usuarios:', error);
      res.status(500).json({ error: 'Error al obtener usuarios' });
    }
  },

  async getById(req, res) {
    try {
      const usuario = await UsuarioModel.findById(req.params.id);
      if (!usuario) {
        return res.status(404).json({ error: 'Usuario no encontrado' });
      }
      const { password_hash, ...usuarioSinPassword } = usuario;
      res.json(usuarioSinPassword);
    } catch (error) {
      console.error('Error al obtener usuario:', error);
      res.status(500).json({ error: 'Error al obtener usuario' });
    }
  },

  async create(req, res) {
    try {
      const bcrypt = require('bcryptjs');
      const { nombre, email, password, rol_id } = req.body;

      const existingUser = await UsuarioModel.findByEmail(email);
      if (existingUser) {
        return res.status(409).json({ error: 'El email ya está registrado' });
      }

      const password_hash = await bcrypt.hash(password, 10);
      const usuario = await UsuarioModel.create({ nombre, email, password_hash, rol_id });

      const { password_hash: _, ...usuarioSinPassword } = usuario;
      res.status(201).json(usuarioSinPassword);
    } catch (error) {
      console.error('Error al crear usuario:', error);
      res.status(500).json({ error: 'Error al crear usuario' });
    }
  },

  async update(req, res) {
    try {
      const usuario = await UsuarioModel.update(req.params.id, req.body);
      if (!usuario) {
        return res.status(404).json({ error: 'Usuario no encontrado' });
      }
      const { password_hash, ...usuarioSinPassword } = usuario;
      res.json(usuarioSinPassword);
    } catch (error) {
      console.error('Error al actualizar usuario:', error);
      res.status(500).json({ error: 'Error al actualizar usuario' });
    }
  },

  async delete(req, res) {
    try {
      const usuario = await UsuarioModel.delete(req.params.id);
      if (!usuario) {
        return res.status(404).json({ error: 'Usuario no encontrado' });
      }
      res.json({ message: 'Usuario eliminado correctamente' });
    } catch (error) {
      console.error('Error al eliminar usuario:', error);
      res.status(500).json({ error: 'Error al eliminar usuario' });
    }
  }
};

module.exports = usuariosController;
