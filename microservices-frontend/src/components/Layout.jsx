import { NavLink } from 'react-router-dom';
import { Package, ShoppingCart, CreditCard } from 'lucide-react';

const Layout = ({ children }) => {
  const navItems = [
    { path: '/productos', label: 'Productos', icon: Package },
    { path: '/ordenes', label: 'Órdenes', icon: ShoppingCart },
    { path: '/pagos', label: 'Pagos', icon: CreditCard },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-bold text-gray-900">
                Sistema de Microservicios
              </h1>
            </div>
            <nav className="flex space-x-1">
              {navItems.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) =>
                    `flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                      isActive
                        ? 'bg-primary-100 text-primary-700 font-medium'
                        : 'text-gray-600 hover:bg-gray-100'
                    }`
                  }
                >
                  <item.icon size={20} />
                  {item.label}
                </NavLink>
              ))}
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="min-h-[calc(100vh-4rem)]">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t mt-12">
        <div className="container mx-auto px-4 py-6 text-center text-gray-600 text-sm">
          © 2026 Sistema de Microservicios - Frontend React
        </div>
      </footer>
    </div>
  );
};

export default Layout;
