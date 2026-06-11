import { useState, useEffect } from 'react';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';
import { 
  DollarSign, 
  AlertTriangle, 
  Package, 
  ShoppingCart,
  TrendingUp,
  Truck
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';

const Dashboard = () => {
  const { user } = useAuth();
  const [kpis, setKpis] = useState(null);
  const [loading, setLoading] = useState(true);
  const [costesPorMesData, setCostesPorMesData] = useState([]);
  const [topProductosCoste, setTopProductosCoste] = useState([]);

  useEffect(() => {
    fetchKPIs();
    if ([1, 3, 4].includes(user?.rol)) {
      fetchCostesPorMes();
      fetchTopProductosCoste();
    }
  }, [user?.rol]);

  const fetchKPIs = async () => {
    try {
      const response = await api.get('/dashboard/kpis');
      console.log('KPIs response:', response.data);
      setKpis(response.data);
    } catch (error) {
      console.error('Error fetching KPIs:', error);
      if (error.response?.status === 403) {
        alert('No tienes permisos para ver los KPIs del dashboard');
      } else {
        alert('Error al cargar los KPIs del dashboard');
      }
    } finally {
      setLoading(false);
    }
  };

  const fetchCostesPorMes = async () => {
    try {
      const response = await api.get('/dashboard/costes-por-mes/2026');
      setCostesPorMesData(response.data);
    } catch (error) {
      console.error('Error fetching costes por mes:', error);
    }
  };

  const fetchTopProductosCoste = async () => {
    try {
      const response = await api.get('/dashboard/top-productos-coste');
      setTopProductosCoste(response.data);
    } catch (error) {
      console.error('Error fetching top productos coste:', error);
    }
  };

  if (loading) {
    return <div className="p-8 text-center">Cargando dashboard...</div>;
  }

  if (!kpis) {
    return <div className="p-8 text-center">Error al cargar los datos del dashboard</div>;
  }

  const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];

  const costesChartData = kpis?.costes_por_tipo?.map(item => ({
    name: item.tipo_operacion,
    value: parseFloat(item.total) || 0
  })) || [];

  const formatNumber = (value) => {
    const num = parseFloat(value);
    return isNaN(num) ? '0.00' : num.toFixed(2);
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">Dashboard Ejecutivo</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Coste Total Logístico</p>
              <p className="text-2xl font-bold text-gray-800">
                ${formatNumber(kpis?.coste_logistico_total)}
              </p>
            </div>
            <DollarSign className="w-10 h-10 text-blue-500" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Alertas Activas</p>
              <p className="text-2xl font-bold text-red-600">{kpis?.alertas_activas || 0}</p>
            </div>
            <AlertTriangle className="w-10 h-10 text-red-500" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Órdenes Pendientes</p>
              <p className="text-2xl font-bold text-yellow-600">{kpis?.ordenes_pendientes || 0}</p>
            </div>
            <ShoppingCart className="w-10 h-10 text-yellow-500" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Unidades en Inventario</p>
              <p className="text-2xl font-bold text-green-600">{kpis?.total_unidades_inventario || 0}</p>
            </div>
            <Package className="w-10 h-10 text-green-500" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">Costes por Tipo</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={costesChartData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {costesChartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">Transporte</h2>
          <div className="space-y-4">
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
              <span className="text-gray-600">Kilómetros Totales</span>
              <span className="font-semibold">{formatNumber(kpis?.transporte?.total_kilometros)} km</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
              <span className="text-gray-600">Coste Total Transporte</span>
              <span className="font-semibold">${formatNumber(kpis?.transporte?.coste_total)}</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-blue-50 rounded">
              <span className="text-gray-600">Coste por Kilómetro</span>
              <span className="font-semibold text-blue-600">${formatNumber(kpis?.transporte?.coste_por_km)}/km</span>
            </div>
          </div>
        </div>
      </div>

      {kpis?.alertas && kpis.alertas.length > 0 && (
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4 text-red-600">Alertas Recientes</h2>
          <div className="space-y-3">
            {kpis.alertas.slice(0, 5).map((alerta) => (
              <div key={alerta.id} className="p-3 bg-red-50 border border-red-200 rounded">
                <div className="flex justify-between">
                  <span className="font-medium text-red-800">{alerta.tipo}</span>
                  <span className="text-sm text-red-600">
                    Diferencia: ${formatNumber(alerta.diferencia)}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mt-1">{alerta.operacion_referencia}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {kpis?.productos_bajo_stock_lista && kpis.productos_bajo_stock_lista.length > 0 && (
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4 text-yellow-600">Productos con Stock Bajo</h2>
          <div className="space-y-3">
            {kpis.productos_bajo_stock_lista.map((producto) => (
              <div key={producto.id} className="p-3 bg-yellow-50 border border-yellow-200 rounded">
                <div className="flex justify-between">
                  <span className="font-medium text-yellow-800">{producto.nombre}</span>
                  <span className="text-sm text-yellow-600">
                    Stock: {producto.stock_actual} / Mín: {producto.stock_minimo}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Reportes detallados solo para Admin, Supervisor y Gerente */}
      {[1, 3, 4].includes(user?.rol) && (
        <>
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-lg font-semibold mb-4">Costes por Mes (2026)</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={costesPorMesData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="mes" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="total" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-lg font-semibold mb-4">Top Productos por Coste</h2>
            <div className="space-y-3">
              {topProductosCoste.map((producto) => (
                <div key={producto.id} className="p-3 bg-blue-50 border border-blue-200 rounded">
                  <div className="flex justify-between">
                    <span className="font-medium text-blue-800">{producto.nombre}</span>
                    <span className="text-sm text-blue-600">
                      Coste: ${formatNumber(producto.coste_almacenamiento)}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">
                    Cantidad: {producto.cantidad_total} | Coste/unidad: ${formatNumber(producto.coste_por_unidad)}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Dashboard;
