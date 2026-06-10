import api from './api';

const PRODUCTS_ENDPOINT = '/productos';

export const productService = {
  /**
   * Obtener todos los productos
   * GET /api/productos
   */
  getAllProducts: async () => {
    const response = await api.get(PRODUCTS_ENDPOINT);
    return response.data;
  },

  /**
   * Obtener un producto por ID
   * GET /api/productos/{id}
   */
  getProductById: async (id) => {
    const response = await api.get(`${PRODUCTS_ENDPOINT}/${id}`);
    return response.data;
  },

  /**
   * Crear un nuevo producto
   * POST /api/productos
   * Body: { nombre, descripcion, precio, stock }
   */
  createProduct: async (productData) => {
    const response = await api.post(PRODUCTS_ENDPOINT, productData);
    return response.data;
  },

  /**
   * Actualizar un producto existente
   * PUT /api/productos/{id}
   */
  updateProduct: async (id, productData) => {
    const response = await api.put(`${PRODUCTS_ENDPOINT}/${id}`, productData);
    return response.data;
  },

  /**
   * Ajustar stock de un producto
   * PATCH /api/productos/{id}/stock?delta={delta}
   */
  adjustStock: async (id, delta) => {
    const response = await api.patch(`${PRODUCTS_ENDPOINT}/${id}/stock`, null, {
      params: { delta }
    });
    return response.data;
  },

  /**
   * Eliminar un producto
   * DELETE /api/productos/{id}
   */
  deleteProduct: async (id) => {
    await api.delete(`${PRODUCTS_ENDPOINT}/${id}`);
    return true;
  },
};

export default productService;


