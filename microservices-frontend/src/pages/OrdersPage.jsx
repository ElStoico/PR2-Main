import { useState } from 'react';
import OrderList from '../components/orders/OrderList';
import OrderForm from '../components/orders/OrderForm';
import OrderDetail from '../components/orders/OrderDetail';

const OrdersPage = () => {
  const [selectedOrder, setSelectedOrder] = useState(null);

  const handleViewDetails = (order) => {
    setSelectedOrder(order);
  };

  const handleCloseDetails = () => {
    setSelectedOrder(null);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">
        Gestión de Órdenes
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Formulario */}
        <div className="lg:col-span-1">
          <OrderForm />
        </div>

        {/* Lista */}
        <div className="lg:col-span-2">
          <OrderList onViewDetails={handleViewDetails} />
        </div>
      </div>

      {/* Modal de Detalle */}
      {selectedOrder && (
        <OrderDetail order={selectedOrder} onClose={handleCloseDetails} />
      )}
    </div>
  );
};

export default OrdersPage;
