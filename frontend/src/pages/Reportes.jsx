import { useState, useEffect } from 'react';
import api from '../services/api';
import { Download, FileText, Database } from 'lucide-react';

const Reportes = () => {
  const [reportes, setReportes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchReportes();
  }, []);

  const fetchReportes = async () => {
    try {
      const [costesLogisticos, ordenes, inventario, transporte] = await Promise.all([
        api.get('/costes-logisticos'),
        api.get('/ordenes-compra'),
        api.get('/inventarios'),
        api.get('/costes-transporte')
      ]);
      
      setReportes([
        {
          id: 1,
          nombre: 'Costes Logísticos Totales',
          descripcion: 'Reporte completo de todos los costes logísticos',
          tipo: 'costes',
          datos: costesLogisticos.data
        },
        {
          id: 2,
          nombre: 'Órdenes de Compra',
          descripcion: 'Reporte de todas las órdenes de compra',
          tipo: 'compras',
          datos: ordenes.data
        },
        {
          id: 3,
          nombre: 'Inventario',
          descripcion: 'Reporte del inventario actual',
          tipo: 'inventario',
          datos: inventario.data
        },
        {
          id: 4,
          nombre: 'Costes de Transporte',
          descripcion: 'Reporte de costes de transporte',
          tipo: 'transporte',
          datos: transporte.data
        }
      ]);
    } catch (error) {
      console.error('Error fetching reportes:', error);
    } finally {
      setLoading(false);
    }
  };

  const exportToPDF = async (reporte) => {
    try {
      const response = await api.post('/reportes/pdf', { 
        tipo: reporte.tipo,
        datos: reporte.datos 
      }, { responseType: 'blob' });
      
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `${reporte.nombre.toLowerCase().replace(/\s+/g, '_')}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error('Error exporting PDF:', error);
      alert('Error al exportar PDF');
    }
  };

  const exportToExcel = async (reporte) => {
    try {
      const response = await api.post('/reportes/excel', { 
        tipo: reporte.tipo,
        datos: reporte.datos 
      }, { responseType: 'blob' });
      
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `${reporte.nombre.toLowerCase().replace(/\s+/g, '_')}.xlsx`);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error('Error exporting Excel:', error);
      alert('Error al exportar Excel');
    }
  };

  if (loading) return <div className="p-8">Cargando...</div>;

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">Reportes</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {reportes.map((reporte) => (
          <div key={reporte.id} className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
            <div className="flex items-center space-x-3 mb-4">
              <FileText className="w-8 h-8 text-blue-500" />
              <h3 className="text-lg font-semibold text-gray-800">{reporte.nombre}</h3>
            </div>
            
            <p className="text-gray-600 text-sm mb-4">{reporte.descripcion}</p>
            
            <div className="flex space-x-2">
              <button
                onClick={() => exportToPDF(reporte)}
                className="flex-1 flex items-center justify-center space-x-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
              >
                <Download className="w-4 h-4" />
                <span>PDF</span>
              </button>
              <button
                onClick={() => exportToExcel(reporte)}
                className="flex-1 flex items-center justify-center space-x-2 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
              >
                <Database className="w-4 h-4" />
                <span>Excel</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Reportes;
