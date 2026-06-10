import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Layout from './components/Layout';
import ProductsPage from './pages/ProductsPage';
import OrdersPage from './pages/OrdersPage';
import PaymentsPage from './pages/PaymentsPage';
import { ProductProvider } from './context/ProductContext';
import { OrderProvider } from './context/OrderContext';
import { PaymentProvider } from './context/PaymentContext';

function App() {
  return (
    <BrowserRouter>
      <ProductProvider>
        <OrderProvider>
          <PaymentProvider>
            <Layout>
              <Routes>
                {/* Redirigir raíz a productos */}
                <Route path="/" element={<Navigate to="/productos" replace />} />

                {/* Rutas principales */}
                <Route path="/productos" element={<ProductsPage />} />
                <Route path="/ordenes" element={<OrdersPage />} />
                <Route path="/pagos" element={<PaymentsPage />} />

                {/* 404 - Redirigir a productos si ruta no existe */}
                <Route path="*" element={<Navigate to="/productos" replace />} />
              </Routes>
            </Layout>

            {/* Toast notifications */}
            <Toaster 
              position="top-right"
              toastOptions={{
                duration: 4000,
                style: {
                  background: '#363636',
                  color: '#fff',
                },
                success: {
                  style: {
                    background: '#4BB543',
                  },
                },
                error: {
                  style: {
                    background: '#FF3333',
                  },
                },
              }}
            />
          </PaymentProvider>
        </OrderProvider>
      </ProductProvider>
    </BrowserRouter>
  );
}

export default App;

