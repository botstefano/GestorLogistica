import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  ShoppingCart, 
  Package, 
  Warehouse, 
  Truck, 
  AlertTriangle, 
  FileText,
  Activity
} from 'lucide-react';

const Sidebar = ({ isOpen }) => {
  const menuItems = [
    { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { path: '/compras', label: 'Compras', icon: ShoppingCart },
    { path: '/inventario', label: 'Inventario', icon: Package },
    { path: '/costes-almacenamiento', label: 'Costes Almacén', icon: Warehouse },
    { path: '/costes-transporte', label: 'Costes Transporte', icon: Truck },
    { path: '/alertas', label: 'Alertas', icon: AlertTriangle },
    { path: '/reportes', label: 'Reportes', icon: FileText },
    { path: '/auditoria', label: 'Auditoría', icon: Activity },
  ];

  return (
    <aside className={`bg-gray-800 text-white transition-all duration-300 ${isOpen ? 'w-64' : 'w-20'}`}>
      <div className="p-4">
        <h2 className={`font-bold text-lg ${isOpen ? 'block' : 'hidden'}`}>Menú</h2>
      </div>
      
      <nav className="mt-4">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center space-x-3 px-4 py-3 hover:bg-gray-700 transition ${
                  isActive ? 'bg-blue-600' : ''
                }`
              }
            >
              <Icon className="w-5 h-5" />
              <span className={isOpen ? 'block' : 'hidden'}>{item.label}</span>
            </NavLink>
          );
        })}
      </nav>
    </aside>
  );
};

export default Sidebar;
