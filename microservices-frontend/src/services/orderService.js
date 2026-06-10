import api from './api';

const ORDERS_ENDPOINT = '/ordenes';

export const orderService = {
  /**
   * Crear una nueva orden
   * POST /api/ordenes
   * Body: { usuarioId, productoId, cantidad }
   */
  createOrder: async (orderData) => {
    const response = await api.post(ORDERS_ENDPOINT, orderData);
    return response.data;
  },

  /**
   * Obtener una orden por ID
   * GET /api/ordenes/{id}
   */
  getOrderById: async (id) => {
    const response = await api.get(`${ORDERS_ENDPOINT}/${id}`);
    return response.data;
  },

  /**
   * Obtener todas las órdenes de un usuario
   * GET /api/ordenes/usuario/{id}
   */
  getOrdersByUser: async (usuarioId) => {
    const response = await api.get(`${ORDERS_ENDPOINT}/usuario/${usuarioId}`);
    return response.data;
  },

  /**
   * Actualizar el estado de una orden
   * PUT /api/ordenes/{id}/status
   * Body: { estado }
   */
  updateOrderStatus: async (id, estado) => {
    const response = await api.put(`${ORDERS_ENDPOINT}/${id}/status`, { estado });
    return response.data;
  },
};

export default orderService;
