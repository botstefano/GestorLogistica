import { useState, useEffect } from 'react';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';
import Table from '../components/Table';
import Form from '../components/Form';
import { Plus, Trash2 } from 'lucide-react';

const CostesTransporte = () => {
  const { user } = useAuth();
  const [costes, setCostes] = useState([]);
  const [vehiculos, setVehiculos] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [costesRes, vehiculosRes] = await Promise.all([
        api.get('/costes-transporte'),
        api.get('/vehiculos')
      ]);
      setCostes(costesRes.data);
      setVehiculos(vehiculosRes.data);
    } catch (error) {
      console.error('Error fetching data:', error);
      if (error.response?.status === 403) {
        alert('No tienes permisos para ver esta información');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async (data) => {
    try {
      await api.post('/costes-transporte', data);
      setShowForm(false);
      fetchData();
    } catch (error) {
      console.error('Error creating coste:', error);
      alert('Error al registrar coste de transporte');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('¿Está seguro de eliminar este coste?')) {
      try {
        await api.delete(`/costes-transporte/${id}`);
        fetchData();
      } catch (error) {
        console.error('Error deleting coste:', error);
      }
    }
  };

  const columns = [
    { key: 'id', header: 'ID' },
    { key: 'placa', header: 'Vehículo' },
    { key: 'fecha', header: 'Fecha' },
    { key: 'ruta_origen', header: 'Origen' },
    { key: 'ruta_destino', header: 'Destino' },
    {
      key: 'kilometros_recorridos',
      header: 'Kilómetros',
      render: (value) => `${parseFloat(value).toFixed(2)} km`
    },
    {
      key: 'coste_combustible',
      header: 'Combustible',
      render: (value) => `$${parseFloat(value).toFixed(2)}`
    },
    {
      key: 'coste_peajes',
      header: 'Peajes',
      render: (value) => `$${parseFloat(value).toFixed(2)}`
    },
    {
      key: 'acciones',
      header: 'Acciones',
      render: (_, row) => (
        user?.rol === 1 && (
          <button
            onClick={() => handleDelete(row.id)}
            className="text-red-600 hover:text-red-800"
            title="Eliminar"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        )
      )
    }
  ];

  const formFields = [
    {
      name: 'vehiculo_id',
      label: 'Vehículo',
      type: 'select',
      required: true,
      options: vehiculos.map(v => ({ value: v.id, label: `${v.placa} - ${v.modelo}` }))
    },
    {
      name: 'fecha',
      label: 'Fecha',
      type: 'date',
      required: true
    },
    {
      name: 'ruta_origen',
      label: 'Ruta Origen',
      type: 'text',
      required: true
    },
    {
      name: 'ruta_destino',
      label: 'Ruta Destino',
      type: 'text',
      required: true
    },
    {
      name: 'kilometros_recorridos',
      label: 'Kilómetros Recorridos',
      type: 'number',
      required: true,
      step: '0.01'
    },
    {
      name: 'coste_combustible',
      label: 'Coste Combustible',
      type: 'number',
      required: true,
      step: '0.01'
    },
    {
      name: 'coste_peajes',
      label: 'Coste Peajes',
      type: 'number',
      required: true,
      step: '0.01'
    },
    {
      name: 'coste_mantenimiento',
      label: 'Coste Mantenimiento',
      type: 'number',
      required: true,
      step: '0.01'
    },
    {
      name: 'coste_conductor',
      label: 'Coste Conductor',
      type: 'number',
      required: true,
      step: '0.01'
    }
  ];

  if (loading) return <div className="p-8">Cargando...</div>;

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Costes de Transporte</h1>
        {[1, 2].includes(user?.rol) && (
          <button
            onClick={() => setShowForm(true)}
            className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            <Plus className="w-5 h-5" />
            <span>Registrar Coste</span>
          </button>
        )}
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-lg">
            <h2 className="text-xl font-bold mb-4">Registrar Coste de Transporte</h2>
            <Form
              fields={formFields}
              onSubmit={handleCreate}
              onCancel={() => setShowForm(false)}
            />
          </div>
        </div>
      )}

      <Table columns={columns} data={costes} />
    </div>
  );
};

export default CostesTransporte;
