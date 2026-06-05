const errorHandler = (err, req, res, next) => {
  console.error(err.stack);

  if (err.name === 'ValidationError') {
    return res.status(400).json({
      error: 'Error de validación',
      detalles: err.message
    });
  }

  if (err.code === '23505') {
    return res.status(409).json({
      error: 'Registro duplicado',
      detalles: 'El registro ya existe en la base de datos'
    });
  }

  if (err.code === '23503') {
    return res.status(400).json({
      error: 'Error de referencia',
      detalles: 'La referencia a otra tabla no existe'
    });
  }

  res.status(500).json({
    error: 'Error interno del servidor',
    detalles: process.env.NODE_ENV === 'development' ? err.message : 'Contacte al administrador'
  });
};

module.exports = errorHandler;
