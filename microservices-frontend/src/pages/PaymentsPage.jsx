import { useState } from 'react';
import { Search, Package } from 'lucide-react';
import PaymentForm from '../components/payments/PaymentForm';
import PaymentDetail from '../components/payments/PaymentDetail';
import { usePayments } from '../context/PaymentContext';
import { useOrders } from '../context/OrderContext';

const PaymentsPage = () => {
  const { selectedPayment, fetchPaymentByOrder } = usePayments();
  const { orders, fetchOrdersByUser, loading: ordersLoading } = useOrders();
  const [selectedOrderId, setSelectedOrderId] = useState('');
  const [usuarioId, setUsuarioId] = useState('');

  const handleLoadOrders = async () => {
    if (!usuarioId.trim()) return;
    try {
      await fetchOrdersByUser(usuarioId.trim());
    } catch (err) {
      // Error manejado por el interceptor
    }
  };

  const handleSearchPayment = async () => {
    if (!selectedOrderId) return;
    try {
      await fetchPaymentByOrder(selectedOrderId);
    } catch (err) {
      // Error manejado por el interceptor
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">
        Gestión de Pagos
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Formulario de Pago */}
        <div className="lg:col-span-1">
          <PaymentForm />
        </div>

        {/* Detalle y Búsqueda */}
        <div className="lg:col-span-2 space-y-6">
          {/* Cargar órdenes de un usuario */}
          <div className="card">
            <h3 className="text-xl font-bold text-gray-800 mb-4">
              Cargar Órdenes de Usuario
            </h3>
            <div className="flex gap-3">
              <input
                type="text"
                value={usuarioId}
                onChange={(e) => setUsuarioId(e.target.value)}
                placeholder="ID de usuario, ej: USR001"
                className="input-field flex-1"
              />
              <button
                onClick={handleLoadOrders}
                disabled={!usuarioId.trim() || ordersLoading}
                className="btn-primary inline-flex items-center gap-2 disabled:opacity-50"
              >
                <Package size={16} />
                {ordersLoading ? 'Cargando...' : 'Cargar Órdenes'}
              </button>
            </div>
          </div>

          {/* Buscar pago por orden */}
          <div className="card">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Buscar Pago por Orden</h3>
            <div className="flex gap-3">
              <select
                value={selectedOrderId}
                onChange={(e) => setSelectedOrderId(e.target.value)}
                className="input-field flex-1"
                disabled={orders.length === 0}
              >
                <option value="">-- Seleccione una orden --</option>
                {orders.map((order) => (
                  <option key={order.id} value={order.id}>
                    Orden #{order.id} - Usuario: {order.usuarioId} - ${order.precioTotal?.toFixed(2)}
                  </option>
                ))}
              </select>
              <button
                onClick={handleSearchPayment}
                disabled={!selectedOrderId}
                className="btn-primary inline-flex items-center gap-2 disabled:opacity-50"
              >
                <Search size={16} />
                Buscar
              </button>
            </div>
            {orders.length === 0 && !ordersLoading && (
              <p className="mt-2 text-sm text-gray-500">
                No hay órdenes cargadas. Ingrese un ID de usuario y presione "Cargar Órdenes".
              </p>
            )}
          </div>

          {/* Detalle del Pago */}
          <PaymentDetail payment={selectedPayment} />
        </div>
      </div>
    </div>
  );
};

export default PaymentsPage;
