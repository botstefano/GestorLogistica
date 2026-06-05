import { useState, useEffect } from 'react';
import api from '../services/api';
import Table from '../components/Table';
import Form from '../components/Form';
import { Plus, Edit, Trash2 } from 'lucide-react';

const Compras = () => {
  const [ordenes, setOrdenes] = useState([]);
  const [proveedores, setProveedores] = useState([]);
  const [productos, setProductos] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [ordenesRes, proveedoresRes, productosRes] = await Promise.all([
        api.get('/ordenes-compra'),
        api.get('/proveedores'),
        api.get('/productos')
      ]);
      setOrdenes(ordenesRes.data);
      setProveedores(proveedoresRes.data);
      setProductos(productosRes.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async (data) => {
    try {
      const detalles = JSON.parse(data.detalles);
      await api.post('/ordenes-compra', {
        proveedor_id: data.proveedor_id,
        fecha_entrega_esperada: data.fecha_entrega_esperada,
        detalles
      });
      setShowForm(false);
      fetchData();
    } catch (error) {
      console.error('Error creating orden:', error);
      alert('Error al crear orden de compra');
    }
  };

  const handleUpdateEstado = async (id, estado) => {
    try {
      await api.patch(`/ordenes-compra/${id}/estado`, { estado });
      fetchData();
    } catch (error) {
      console.error('Error updating estado:', error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('¿Está seguro de eliminar esta orden?')) {
      try {
        await api.delete(`/ordenes-compra/${id}`);
        fetchData();
      } catch (error) {
        console.error('Error deleting orden:', error);
      }
    }
  };

  const columns = [
    { key: 'id', header: 'ID' },
    { key: 'proveedor_nombre', header: 'Proveedor' },
    { 
      key: 'fecha_emision', 
      header: 'Fecha Emisión',
      render: (value) => new Date(value).toLocaleDateString()
    },
    { key: 'fecha_entrega_esperada', header: 'Fecha Entrega' },
    { 
      key: 'total', 
      header: 'Total',
      render: (value) => `$${parseFloat(value).toFixed(2)}`
    },
    { 
      key: 'estado', 
      header: 'Estado',
      render: (value) => (
        <span className={`px-2 py-1 rounded text-xs ${
          value === 'entregado' ? 'bg-green-100 text-green-800' :
          value === 'en_transito' ? 'bg-blue-100 text-blue-800' :
          value === 'en_almacen' ? 'bg-yellow-100 text-yellow-800' :
          'bg-gray-100 text-gray-800'
        }`}>
          {value}
        </span>
      )
    },
    {
      key: 'acciones',
      header: 'Acciones',
      render: (_, row) => (
        <div className="flex space-x-2">
          {row.estado === 'pendiente' && (
            <button
              onClick={() => handleUpdateEstado(row.id, 'en_almacen')}
              className="text-blue-600 hover:text-blue-800"
              title="Recibir"
            >
              Recibir
            </button>
          )}
          {row.estado === 'en_almacen' && (
            <button
              onClick={() => handleUpdateEstado(row.id, 'entregado')}
              className="text-green-600 hover:text-green-800"
              title="Entregar"
            >
              Entregar
            </button>
          )}
          <button
            onClick={() => handleDelete(row.id)}
            className="text-red-600 hover:text-red-800"
            title="Eliminar"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      )
    }
  ];

  const formFields = [
    {
      name: 'proveedor_id',
      label: 'Proveedor',
      type: 'select',
      required: true,
      options: proveedores.map(p => ({ value: p.id, label: p.nombre }))
    },
    {
      name: 'fecha_entrega_esperada',
      label: 'Fecha Entrega Esperada',
      type: 'date',
      required: true
    },
    {
      name: 'detalles',
      label: 'Detalles (JSON con producto_id, cantidad, precio_unitario)',
      type: 'textarea',
      required: true,
      rows: 4
    }
  ];

  if (loading) return <div className="p-8">Cargando...</div>;

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Órdenes de Compra</h1>
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          <Plus className="w-5 h-5" />
          <span>Nueva Orden</span>
        </button>
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-lg">
            <h2 className="text-xl font-bold mb-4">Nueva Orden de Compra</h2>
            <Form
              fields={formFields}
              onSubmit={handleCreate}
              onCancel={() => setShowForm(false)}
            />
          </div>
        </div>
      )}

      <Table columns={columns} data={ordenes} />
    </div>
  );
};

export default Compras;
