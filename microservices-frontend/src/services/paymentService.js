import api from './api';

const PAYMENTS_ENDPOINT = '/pagos';

export const paymentService = {
  /**
   * Procesar un nuevo pago
   * POST /api/pagos/procesar
   * Body: { ordenId, monto, metodoPago }
   */
  processPayment: async (paymentData) => {
    const response = await api.post(`${PAYMENTS_ENDPOINT}/procesar`, paymentData);
    return response.data;
  },

  /**
   * Obtener un pago por ID
   * GET /api/pagos/{id}
   */
  getPaymentById: async (id) => {
    const response = await api.get(`${PAYMENTS_ENDPOINT}/${id}`);
    return response.data;
  },

  /**
   * Obtener pago asociado a una orden
   * GET /api/pagos/orden/{id}
   */
  getPaymentByOrder: async (ordenId) => {
    const response = await api.get(`${PAYMENTS_ENDPOINT}/orden/${ordenId}`);
    return response.data;
  },

  /**
   * Reembolsar un pago
   * PUT /api/pagos/{id}/reembolso
   */
  refundPayment: async (id) => {
    const response = await api.put(`${PAYMENTS_ENDPOINT}/${id}/reembolso`);
    return response.data;
  },
};

export default paymentService;
