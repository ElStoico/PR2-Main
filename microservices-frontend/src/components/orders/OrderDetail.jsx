import { useState } from 'react';
import { X, RefreshCw } from 'lucide-react';
import { useOrders } from '../../context/OrderContext';

const OrderDetail = ({ order, onClose }) => {
  const { updateStatus, loading } = useOrders();
  const [selectedStatus, setSelectedStatus] = useState(order?.estado || '');

  const statusOptions = ['PENDIENTE', 'PAGADA', 'ENVIADA', 'ENTREGADA', 'CANCELADA'];

  const handleUpdateStatus = async () => {
    if (selectedStatus === order.estado) {
      return;
    }

    try {
      await updateStatus(order.id, selectedStatus);
    } catch (err) {
      // Manejado por el interceptor
    }
  };

  if (!order) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-2xl font-bold text-gray-900">Detalle de Orden #{order.id}</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-500">ID de Orden</p>
              <p className="font-semibold text-gray-900">{order.id}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Usuario</p>
              <p className="font-semibold text-gray-900">{order.usuarioId}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Producto ID</p>
              <p className="font-semibold text-gray-900">{order.productoId}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Cantidad</p>
              <p className="font-semibold text-gray-900">{order.cantidad}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Precio Total</p>
              <p className="font-semibold text-gray-900">${order.precioTotal?.toFixed(2)}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Estado Actual</p>
              <p className="font-semibold text-gray-900">{order.estado}</p>
            </div>
          </div>

          {/* Actualizar Estado */}
          <div className="pt-4 border-t">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Cambiar Estado
            </label>
            <div className="flex gap-3">
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="input-field flex-1"
              >
                {statusOptions.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
              <button
                onClick={handleUpdateStatus}
                disabled={loading || selectedStatus === order.estado}
                className="btn-primary inline-flex items-center gap-2 disabled:opacity-50"
              >
                <RefreshCw size={16} />
                Actualizar
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t flex justify-end">
          <button onClick={onClose} className="btn bg-gray-200 text-gray-700 hover:bg-gray-300">
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderDetail;
