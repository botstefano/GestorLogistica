import { useState, useEffect } from 'react';
import api from '../services/api';
import Table from '../components/Table';
import Form from '../components/Form';
import { Plus, Edit, Trash2 } from 'lucide-react';

const Inventario = () => {
  const [inventario, setInventario] = useState([]);
  const [productos, setProductos] = useState([]);
  const [almacenes, setAlmacenes] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [invRes, productosRes, almacenesRes] = await Promise.all([
        api.get('/inventarios'),
        api.get('/productos'),
        api.get('/almacenes')
      ]);
      setInventario(invRes.data);
      setProductos(productosRes.data);
      setAlmacenes(almacenesRes.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async (data) => {
    try {
      await api.post('/inventarios', data);
      setShowForm(false);
      fetchData();
    } catch (error) {
      console.error('Error creating inventario:', error);
      alert('Error al crear registro de inventario');
    }
  };

  const handleUpdate = async (id, data) => {
    try {
      await api.put(`/inventarios/${id}`, data);
      fetchData();
    } catch (error) {
      console.error('Error updating inventario:', error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('¿Está seguro de eliminar este registro?')) {
      try {
        await api.delete(`/inventarios/${id}`);
        fetchData();
      } catch (error) {
        console.error('Error deleting inventario:', error);
      }
    }
  };

  const columns = [
    { key: 'id', header: 'ID' },
    { key: 'producto_nombre', header: 'Producto' },
    { key: 'almacen_nombre', header: 'Almacén' },
    { key: 'cantidad', header: 'Cantidad' },
    { key: 'ubicacion_estanteria', header: 'Ubicación' },
    {
      key: 'ultima_actualizacion',
      header: 'Última Actualización',
      render: (value) => new Date(value).toLocaleString()
    },
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
      name: 'producto_id',
      label: 'Producto',
      type: 'select',
      required: true,
      options: productos.map(p => ({ value: p.id, label: p.nombre }))
    },
    {
      name: 'almacen_id',
      label: 'Almacén',
      type: 'select',
      required: true,
      options: almacenes.map(a => ({ value: a.id, label: a.nombre }))
    },
    {
      name: 'cantidad',
      label: 'Cantidad',
      type: 'number',
      required: true
    },
    {
      name: 'ubicacion_estanteria',
      label: 'Ubicación Estantería',
      type: 'text',
      required: true
    }
  ];

  if (loading) return <div className="p-8">Cargando...</div>;

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Inventario</h1>
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          <Plus className="w-5 h-5" />
          <span>Nuevo Registro</span>
        </button>
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-lg">
            <h2 className="text-xl font-bold mb-4">Nuevo Registro de Inventario</h2>
            <Form
              fields={formFields}
              onSubmit={handleCreate}
              onCancel={() => setShowForm(false)}
            />
          </div>
        </div>
      )}

      <Table columns={columns} data={inventario} />
    </div>
  );
};

export default Inventario;
