const AuditoriaModel = require('../models/auditorias');

const auditoriaMiddleware = (tabla) => {
  return async (req, res, next) => {
    const originalSend = res.send;
    
    res.send = function(data) {
      res.send = originalSend;
      
      if (res.statusCode >= 200 && res.statusCode < 300 && req.method !== 'GET') {
        const accion = req.method === 'POST' ? 'INSERT' : req.method === 'PUT' ? 'UPDATE' : 'DELETE';
        const registro_id = req.params.id || (data && data.id);
        
        AuditoriaModel.create({
          usuario_id: req.user?.id,
          accion,
          tabla_afectada: tabla,
          registro_id,
          datos_anteriores_json: req.body
        }).catch(err => console.error('Error al guardar auditoría:', err));
      }
      
      originalSend.call(this, data);
    };
    
    next();
  };
};

module.exports = auditoriaMiddleware;
