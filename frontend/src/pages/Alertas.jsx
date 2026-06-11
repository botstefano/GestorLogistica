import { useState, useEffect } from 'react';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';
import Table from '../components/Table';
import { CheckCircle } from 'lucide-react';

const Alertas = () => {
  const { user } = useAuth();
  const [alertas, setAlertas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAlertas();
  }, []);

  const fetchAlertas = async () => {
    try {
      const response = await api.get('/alertas/activas');
      setAlertas(response.data);
    } catch (error) {
      console.error('Error fetching alertas:', error);
      if (error.response?.status === 403) {
        alert('No tienes permisos para ver las alertas');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleResolve = async (id) => {
    try {
      await api.patch(`/alertas/${id}/estado`, { estado: 'resuelta' });
      fetchAlertas();
    } catch (error) {
      console.error('Error resolving alerta:', error);
    }
  };

  const columns = [
    { key: 'id', header: 'ID' },
    { key: 'tipo', header: 'Tipo' },
    {
      key: 'fecha',
      header: 'Fecha',
      render: (value) => new Date(value).toLocaleString()
    },
    {
      key: 'monto_esperado',
      header: 'Monto Esperado',
      render: (value) => `$${parseFloat(value).toFixed(2)}`
    },
    {
      key: 'monto_real',
      header: 'Monto Real',
      render: (value) => `$${parseFloat(value).toFixed(2)}`
    },
    {
      key: 'diferencia',
      header: 'Diferencia',
      render: (value) => (
        <span className={`font-semibold ${parseFloat(value) > 0 ? 'text-red-600' : 'text-green-600'}`}>
          ${parseFloat(value).toFixed(2)}
        </span>
      )
    },
    { key: 'operacion_referencia', header: 'Referencia' },
    {
      key: 'acciones',
      header: 'Acciones',
      render: (_, row) => (
        [1, 3].includes(user?.rol) && (
          <button
            onClick={() => handleResolve(row.id)}
            className="flex items-center space-x-1 px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
            title="Marcar como resuelta"
          >
            <CheckCircle className="w-4 h-4" />
            <span>Resolver</span>
          </button>
        )
      )
    }
  ];

  if (loading) return <div className="p-8">Cargando...</div>;

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">Alertas de Sobrecostes</h1>

      {alertas.length === 0 ? (
        <div className="bg-green-50 border border-green-200 text-green-800 px-4 py-8 rounded-lg text-center">
          <p className="text-lg font-semibold">¡No hay alertas activas!</p>
          <p className="text-sm mt-2">Todos los costes están dentro de los umbrales esperados.</p>
        </div>
      ) : (
        <Table columns={columns} data={alertas} />
      )}
    </div>
  );
};

export default Alertas;
