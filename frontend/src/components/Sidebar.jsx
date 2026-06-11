import { NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
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
  const { user } = useAuth();
  
  const menuItems = [
    { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard, roles: [1, 2, 3, 4] },
    { path: '/compras', label: 'Compras', icon: ShoppingCart, roles: [1, 2, 3, 4] },
    { path: '/inventario', label: 'Inventario', icon: Package, roles: [1, 2, 3, 4] },
    { path: '/costes-almacenamiento', label: 'Costes Almacén', icon: Warehouse, roles: [1, 2, 3, 4] },
    { path: '/costes-transporte', label: 'Costes Transporte', icon: Truck, roles: [1, 2, 3, 4] },
    { path: '/alertas', label: 'Alertas', icon: AlertTriangle, roles: [1, 2, 3, 4] },
    { path: '/reportes', label: 'Reportes', icon: FileText, roles: [1, 3, 4] },
    { path: '/auditoria', label: 'Auditoría', icon: Activity, roles: [1, 3] },
  ];

  const filteredMenuItems = menuItems.filter(item => item.roles.includes(user?.rol_id));

  return (
    <aside className={`bg-gray-800 text-white transition-all duration-300 ${isOpen ? 'w-64' : 'w-20'}`}>
      <div className="p-4">
        <h2 className={`font-bold text-lg ${isOpen ? 'block' : 'hidden'}`}>Menú</h2>
      </div>
      
      <nav className="mt-4">
        {filteredMenuItems.map((item) => {
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
