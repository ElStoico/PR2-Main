import { createContext, useContext, useState } from 'react';
import toast from 'react-hot-toast';
import paymentService from '../services/paymentService';

const PaymentContext = createContext();

export const usePayments = () => {
  const context = useContext(PaymentContext);
  if (!context) {
    throw new Error('usePayments debe usarse dentro de PaymentProvider');
  }
  return context;
};

export const PaymentProvider = ({ children }) => {
  const [payments, setPayments] = useState([]);
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  /**
   * Procesar un nuevo pago
   */
  const processPayment = async (paymentData) => {
    setLoading(true);
    try {
      const newPayment = await paymentService.processPayment(paymentData);
      setPayments((prev) => [...prev, newPayment]);
      toast.success(`Pago procesado exitosamente. ID: ${newPayment.id}`);
      return newPayment;
    } catch (err) {
      throw err;
    } finally {
      setLoading(false);
    }
  };

  /**
   * Obtener pago por orden
   */
  const fetchPaymentByOrder = async (ordenId) => {
    setLoading(true);
    setError(null);
    try {
      const payment = await paymentService.getPaymentByOrder(ordenId);
      setSelectedPayment(payment);
      return payment;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  /**
   * Reembolsar un pago
   */
  const refundPayment = async (id) => {
    setLoading(true);
    try {
      const refundedPayment = await paymentService.refundPayment(id);
      setPayments((prev) =>
        prev.map((p) => (p.id === id ? refundedPayment : p))
      );
      if (selectedPayment?.id === id) {
        setSelectedPayment(refundedPayment);
      }
      toast.success('Pago reembolsado exitosamente');
      return refundedPayment;
    } catch (err) {
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const value = {
    payments,
    selectedPayment,
    loading,
    error,
    processPayment,
    fetchPaymentByOrder,
    refundPayment,
    setSelectedPayment,
  };

  return (
    <PaymentContext.Provider value={value}>
      {children}
    </PaymentContext.Provider>
  );
};

export default PaymentContext;
