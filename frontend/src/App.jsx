import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Compras from './pages/Compras';
import Inventario from './pages/Inventario';
import CostesAlmacenamiento from './pages/CostesAlmacenamiento';
import CostesTransporte from './pages/CostesTransporte';
import Alertas from './pages/Alertas';
import Reportes from './pages/Reportes';
import Auditoria from './pages/Auditoria';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  
  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Cargando...</div>;
  }
  
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  
  return children;
};

const Layout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
      <div className="flex">
        <Sidebar isOpen={sidebarOpen} />
        <main className={`flex-1 p-6 transition-all ${sidebarOpen ? 'ml-64' : 'ml-20'}`}>
          {children}
        </main>
      </div>
    </div>
  );
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/*"
            element={
              <ProtectedRoute>
                <Layout>
                  <Routes>
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/compras" element={<Compras />} />
                    <Route path="/inventario" element={<Inventario />} />
                    <Route path="/costes-almacenamiento" element={<CostesAlmacenamiento />} />
                    <Route path="/costes-transporte" element={<CostesTransporte />} />
                    <Route path="/alertas" element={<Alertas />} />
                    <Route path="/reportes" element={<Reportes />} />
                    <Route path="/auditoria" element={<Auditoria />} />
                    <Route path="/" element={<Navigate to="/dashboard" />} />
                  </Routes>
                </Layout>
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
