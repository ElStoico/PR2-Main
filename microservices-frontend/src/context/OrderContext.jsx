import { createContext, useContext, useState } from 'react';
import toast from 'react-hot-toast';
import orderService from '../services/orderService';

const OrderContext = createContext();

export const useOrders = () => {
  const context = useContext(OrderContext);
  if (!context) {
    throw new Error('useOrders debe usarse dentro de OrderProvider');
  }
  return context;
};

export const OrderProvider = ({ children }) => {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  /**
   * Obtener órdenes por usuario
   */
  const fetchOrdersByUser = async (usuarioId) => {
    setLoading(true);
    setError(null);
    try {
      const data = await orderService.getOrdersByUser(usuarioId);
      setOrders(data);
      return data;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  /**
   * Obtener orden por ID
   */
  const fetchOrderById = async (id) => {
    setLoading(true);
    setError(null);
    try {
      const data = await orderService.getOrderById(id);
      setSelectedOrder(data);
      return data;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  /**
   * Crear una nueva orden
   */
  const createOrder = async (orderData) => {
    setLoading(true);
    try {
      const newOrder = await orderService.createOrder(orderData);
      setOrders((prev) => [...prev, newOrder]);
      toast.success(`Orden #${newOrder.id} creada exitosamente`);
      return newOrder;
    } catch (err) {
      throw err;
    } finally {
      setLoading(false);
    }
  };

  /**
   * Actualizar estado de orden
   */
  const updateStatus = async (id, estado) => {
    setLoading(true);
    try {
      const updatedOrder = await orderService.updateOrderStatus(id, estado);
      setOrders((prev) =>
        prev.map((o) => (o.id === id ? updatedOrder : o))
      );
      if (selectedOrder?.id === id) {
        setSelectedOrder(updatedOrder);
      }
      toast.success(`Orden actualizada a estado: ${estado}`);
      return updatedOrder;
    } catch (err) {
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const value = {
    orders,
    selectedOrder,
    loading,
    error,
    fetchOrdersByUser,
    fetchOrderById,
    createOrder,
    updateStatus,
    setSelectedOrder,
  };

  return (
    <OrderContext.Provider value={value}>
      {children}
    </OrderContext.Provider>
  );
};

export default OrderContext;
