import { useState } from 'react';
import { CreditCard } from 'lucide-react';
import { usePayments } from '../../context/PaymentContext';
import { useOrders } from '../../context/OrderContext';

const PaymentForm = () => {
  const { processPayment, loading } = usePayments();
  const { orders } = useOrders();
  
  const [formData, setFormData] = useState({
    ordenId: '',
    monto: '',
    metodoPago: 'TARJETA',
  });
  const [errors, setErrors] = useState({});

  const metodosPago = ['EFECTIVO', 'TARJETA', 'TRANSFERENCIA'];

  const validateForm = () => {
    const newErrors = {};

    if (!formData.ordenId) {
      newErrors.ordenId = 'Debe seleccionar una orden';
    }

    if (!formData.monto || parseFloat(formData.monto) <= 0) {
      newErrors.monto = 'El monto debe ser mayor a 0';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
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
      await processPayment({
        ordenId: formData.ordenId,
        monto: parseFloat(formData.monto),
        metodoPago: formData.metodoPago,
      });

      // Limpiar formulario
      setFormData({
        ordenId: '',
        monto: '',
        metodoPago: 'TARJETA',
      });
      setErrors({});
    } catch (err) {
      // Manejado por el interceptor
    }
  };

  return (
    <div className="card">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Procesar Pago</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Orden */}
        <div>
          <label htmlFor="ordenId" className="block text-sm font-medium text-gray-700 mb-1">
            Seleccionar Orden *
          </label>
          <select
            id="ordenId"
            name="ordenId"
            value={formData.ordenId}
            onChange={handleChange}
            className={`input-field ${errors.ordenId ? 'border-red-500' : ''}`}
          >
            <option value="">-- Seleccione una orden --</option>
            {orders.map((order) => (
              <option key={order.id} value={order.id}>
                Orden #{order.id} - ${order.precioTotal?.toFixed(2)}
              </option>
            ))}
          </select>
          {errors.ordenId && (
            <p className="mt-1 text-sm text-red-600">{errors.ordenId}</p>
          )}
        </div>

        {/* Monto */}
        <div>
          <label htmlFor="monto" className="block text-sm font-medium text-gray-700 mb-1">
            Monto ($) *
          </label>
          <input
            type="number"
            id="monto"
            name="monto"
            value={formData.monto}
            onChange={handleChange}
            step="0.01"
            min="0"
            className={`input-field ${errors.monto ? 'border-red-500' : ''}`}
            placeholder="0.00"
          />
          {errors.monto && (
            <p className="mt-1 text-sm text-red-600">{errors.monto}</p>
          )}
        </div>

        {/* Método de Pago */}
        <div>
          <label htmlFor="metodoPago" className="block text-sm font-medium text-gray-700 mb-1">
            Método de Pago *
          </label>
          <select
            id="metodoPago"
            name="metodoPago"
            value={formData.metodoPago}
            onChange={handleChange}
            className="input-field"
          >
            {metodosPago.map((metodo) => (
              <option key={metodo} value={metodo}>
                {metodo}
              </option>
            ))}
          </select>
        </div>

        {/* Botón Submit */}
        <div className="flex justify-end pt-4">
          <button
            type="submit"
            disabled={loading}
            className="btn-primary inline-flex items-center gap-2 disabled:opacity-50"
          >
            <CreditCard size={20} />
            {loading ? 'Procesando...' : 'Procesar Pago'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default PaymentForm;
