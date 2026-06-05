import { useState, useEffect } from 'react';
import api from '../services/api';
import Table from '../components/Table';

const Auditoria = () => {
  const [auditorias, setAuditorias] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAuditorias();
  }, []);

  const fetchAuditorias = async () => {
    try {
      const response = await api.get('/auditorias');
      setAuditorias(response.data);
    } catch (error) {
      console.error('Error fetching auditorias:', error);
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    { key: 'id', header: 'ID' },
    { key: 'usuario_nombre', header: 'Usuario' },
    { key: 'accion', header: 'Acción' },
    { key: 'tabla_afectada', header: 'Tabla' },
    { key: 'registro_id', header: 'ID Registro' },
    {
      key: 'fecha_cambio',
      header: 'Fecha',
      render: (value) => new Date(value).toLocaleString()
    }
  ];

  if (loading) return <div className="p-8">Cargando...</div>;

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">Auditoría de Cambios</h1>
      <Table columns={columns} data={auditorias} />
    </div>
  );
};

export default Auditoria;
