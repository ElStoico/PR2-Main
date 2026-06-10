import { useState, useEffect } from 'react';
import { ShoppingCart, Search, X } from 'lucide-react';
import { useOrders } from '../../context/OrderContext';
import { useProducts } from '../../context/ProductContext';

const OrderForm = () => {
  const { createOrder, loading } = useOrders();
  const { products, fetchProducts } = useProducts();
  
  const [formData, setFormData] = useState({
    usuarioId: '',
    productoId: '',
    cantidad: '',
  });
  const [errors, setErrors] = useState({});
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    // Cargar productos si no están disponibles
    if (products.length === 0) {
      fetchProducts();
    }
  }, []);

  // Filtrar productos por búsqueda (Option B: Searchable dropdown)
  const filteredProducts = products.filter((p) =>
    p.nombre.toLowerCase().includes(searchTerm.toLowerCase()) && p.stock > 0
  );

  const validateForm = () => {
    const newErrors = {};

    if (!formData.usuarioId.trim()) {
      newErrors.usuarioId = 'El ID de usuario es obligatorio';
    }

    if (!formData.productoId) {
      newErrors.productoId = 'Debe seleccionar un producto';
    }

    // ⚠️ VALIDACIÓN CRÍTICA: Cantidad debe ser mayor a 0
    if (!formData.cantidad || parseInt(formData.cantidad) <= 0) {
      newErrors.cantidad = 'La cantidad debe ser mayor a 0';
    }

    // Validar que haya stock suficiente
    if (selectedProduct && parseInt(formData.cantidad) > selectedProduct.stock) {
      newErrors.cantidad = `Stock insuficiente (disponible: ${selectedProduct.stock})`;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleProductSelect = (product) => {
    setFormData((prev) => ({
      ...prev,
      productoId: product.id,
    }));
    setSelectedProduct(product);
    setSearchTerm('');
    setShowDropdown(false);
    // Limpiar error
    if (errors.productoId) {
      setErrors((prev) => ({ ...prev, productoId: '' }));
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Limpiar error del campo
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      await createOrder({
        usuarioId: formData.usuarioId.trim(),
        productoId: formData.productoId,
        cantidad: parseInt(formData.cantidad),
      });

      // Limpiar formulario
      setFormData({
        usuarioId: '',
        productoId: '',
        cantidad: '',
      });
      setSelectedProduct(null);
      setErrors({});
    } catch (err) {
      // Manejado por el interceptor
    }
  };

  return (
    <div className="card">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Crear Nueva Orden</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Usuario ID */}
        <div>
          <label htmlFor="usuarioId" className="block text-sm font-medium text-gray-700 mb-1">
            ID de Usuario *
          </label>
          <input
            type="text"
            id="usuarioId"
            name="usuarioId"
            value={formData.usuarioId}
            onChange={handleChange}
            className={`input-field ${errors.usuarioId ? 'border-red-500' : ''}`}
            placeholder="Ej: USR001"
          />
          {errors.usuarioId && (
            <p className="mt-1 text-sm text-red-600">{errors.usuarioId}</p>
          )}
        </div>

        {/* Selección de Producto (Option B: Searchable Dropdown) */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Producto *
          </label>
          
          {selectedProduct ? (
            <div className="p-3 bg-primary-50 border border-primary-200 rounded-lg">
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-medium text-gray-900">{selectedProduct.nombre}</p>
                  <p className="text-sm text-gray-600 mt-1">
                    Precio: ${selectedProduct.precio?.toFixed(2)} | Stock: {selectedProduct.stock}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setSelectedProduct(null);
                    setFormData((prev) => ({ ...prev, productoId: '' }));
                  }}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X size={20} />
                </button>
              </div>
            </div>
          ) : (
            <div className="relative">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setShowDropdown(true);
                  }}
                  onFocus={() => setShowDropdown(true)}
                  className={`input-field pl-10 ${errors.productoId ? 'border-red-500' : ''}`}
                  placeholder="Buscar producto por nombre..."
                />
              </div>
              
              {showDropdown && searchTerm && filteredProducts.length > 0 && (
                <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                  {filteredProducts.map((product) => (
                    <button
                      key={product.id}
                      type="button"
                      onClick={() => handleProductSelect(product)}
                      className="w-full text-left px-4 py-3 hover:bg-gray-100 border-b border-gray-200 last:border-b-0"
                    >
                      <p className="font-medium text-gray-900">{product.nombre}</p>
                      <p className="text-sm text-gray-600">
                        Precio: ${product.precio?.toFixed(2)} | Stock: {product.stock}
                      </p>
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}
          
          {errors.productoId && (
            <p className="mt-1 text-sm text-red-600">{errors.productoId}</p>
          )}
        </div>

        {/* Cantidad */}
        <div>
          <label htmlFor="cantidad" className="block text-sm font-medium text-gray-700 mb-1">
            Cantidad *
          </label>
          <input
            type="number"
            id="cantidad"
            name="cantidad"
            value={formData.cantidad}
            onChange={handleChange}
            min="1"
            className={`input-field ${errors.cantidad ? 'border-red-500' : ''}`}
            placeholder="0"
          />
          {errors.cantidad && (
            <p className="mt-1 text-sm text-red-600">{errors.cantidad}</p>
          )}
          {selectedProduct && formData.cantidad && (
            <p className="mt-1 text-sm text-gray-600">
              Total estimado: ${(selectedProduct.precio * parseInt(formData.cantidad)).toFixed(2)}
            </p>
          )}
        </div>

        {/* Botón Submit */}
        <div className="flex justify-end pt-4">
          <button
            type="submit"
            disabled={loading}
            className="btn-primary inline-flex items-center gap-2 disabled:opacity-50"
          >
            <ShoppingCart size={20} />
            {loading ? 'Creando...' : 'Crear Orden'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default OrderForm;
