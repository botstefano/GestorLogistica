import { useState, useEffect } from 'react';
import api from '../services/api';
import Table from '../components/Table';
import Form from '../components/Form';
import { Plus, Trash2 } from 'lucide-react';

const CostesAlmacenamiento = () => {
  const [costes, setCostes] = useState([]);
  const [almacenes, setAlmacenes] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [costesRes, almacenesRes] = await Promise.all([
        api.get('/costes-almacenamiento'),
        api.get('/almacenes')
      ]);
      setCostes(costesRes.data);
      setAlmacenes(almacenesRes.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async (data) => {
    try {
      await api.post('/costes-almacenamiento', data);
      setShowForm(false);
      fetchData();
    } catch (error) {
      console.error('Error creating coste:', error);
      alert('Error al registrar coste de almacenamiento');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('¿Está seguro de eliminar este coste?')) {
      try {
        await api.delete(`/costes-almacenamiento/${id}`);
        fetchData();
      } catch (error) {
        console.error('Error deleting coste:', error);
      }
    }
  };

  const columns = [
    { key: 'id', header: 'ID' },
    { key: 'almacen_nombre', header: 'Almacén' },
    { key: 'fecha', header: 'Fecha' },
    { key: 'concepto', header: 'Concepto' },
    {
      key: 'monto',
      header: 'Monto',
      render: (value) => `$${parseFloat(value).toFixed(2)}`
    },
    { key: 'tipo_gasto', header: 'Tipo Gasto' },
    {
      key: 'acciones',
      header: 'Acciones',
      render: (_, row) => (
        <button
          onClick={() => handleDelete(row.id)}
          className="text-red-600 hover:text-red-800"
          title="Eliminar"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      )
    }
  ];

  const formFields = [
    {
      name: 'almacen_id',
      label: 'Almacén',
      type: 'select',
      required: true,
      options: almacenes.map(a => ({ value: a.id, label: a.nombre }))
    },
    {
      name: 'fecha',
      label: 'Fecha',
      type: 'date',
      required: true
    },
    {
      name: 'concepto',
      label: 'Concepto',
      type: 'text',
      required: true
    },
    {
      name: 'monto',
      label: 'Monto',
      type: 'number',
      required: true
    },
    {
      name: 'tipo_gasto',
      label: 'Tipo de Gasto',
      type: 'select',
      required: true,
      options: [
        { value: 'alquiler', label: 'Alquiler' },
        { value: 'mantenimiento', label: 'Mantenimiento' },
        { value: 'mano_obra', label: 'Mano de Obra' },
        { value: 'servicios', label: 'Servicios' }
      ]
    }
  ];

  if (loading) return <div className="p-8">Cargando...</div>;

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Costes de Almacenamiento</h1>
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          <Plus className="w-5 h-5" />
          <span>Registrar Coste</span>
        </button>
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-lg">
            <h2 className="text-xl font-bold mb-4">Registrar Coste de Almacenamiento</h2>
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

export default CostesAlmacenamiento;
