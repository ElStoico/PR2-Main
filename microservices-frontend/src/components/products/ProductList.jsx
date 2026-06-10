import { useState } from 'react';
import { Trash2, AlertTriangle } from 'lucide-react';
import { useProducts } from '../../context/ProductContext';
import LoadingSpinner from '../common/LoadingSpinner';
import ErrorMessage from '../common/ErrorMessage';
import ConfirmDialog from '../common/ConfirmDialog';

const ProductList = () => {
  const { products, loading, error, removeProduct, fetchProducts } = useProducts();
  const [deleteConfirm, setDeleteConfirm] = useState({ show: false, productId: null, productName: '' });

  const handleDeleteClick = (product) => {
    setDeleteConfirm({
      show: true,
      productId: product.id,
      productName: product.nombre,
    });
  };

  const handleConfirmDelete = async () => {
    try {
      await removeProduct(deleteConfirm.productId);
      setDeleteConfirm({ show: false, productId: null, productName: '' });
    } catch (err) {
      // El error ya se maneja en el interceptor
    }
  };

  const handleRetry = () => {
    fetchProducts();
  };

  if (loading && products.length === 0) {
    return <LoadingSpinner message="Cargando productos..." />;
  }

  if (error && products.length === 0) {
    return (
      <ErrorMessage 
        message={error} 
        onRetry={handleRetry}
      />
    );
  }

  return (
    <div className="card">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-gray-800">Lista de Productos</h2>
        <span className="text-sm text-gray-500">
          {products.length} producto{products.length !== 1 ? 's' : ''}
        </span>
      </div>

      {products.length === 0 ? (
        <div className="text-center py-12 text-gray-500">
          <p className="text-lg">No hay productos registrados</p>
          <p className="text-sm mt-2">Crea tu primer producto usando el formulario</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Nombre
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Descripción
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Precio
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Stock
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {products.map((product) => (
                <tr key={product.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {product.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {product.nombre}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {product.descripcion || '-'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    ${product.precio?.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {product.stock}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    <button
                      onClick={() => handleDeleteClick(product)}
                      className="text-red-600 hover:text-red-800 inline-flex items-center gap-1"
                    >
                      <Trash2 size={16} />
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Diálogo de confirmación */}
      <ConfirmDialog
        isOpen={deleteConfirm.show}
        title="Confirmar Eliminación"
        message={`¿Está seguro que desea eliminar el producto "${deleteConfirm.productName}"? Esta acción no se puede deshacer.`}
        confirmText="Eliminar"
        cancelText="Cancelar"
        onConfirm={handleConfirmDelete}
        onCancel={() => setDeleteConfirm({ show: false, productId: null, productName: '' })}
        confirmButtonClass="btn-danger"
        icon={<AlertTriangle className="text-danger-600" size={48} />}
      />
    </div>
  );
};

export default ProductList;
