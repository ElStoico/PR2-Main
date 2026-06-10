import { useState } from 'react';
import { RefreshCw, AlertTriangle } from 'lucide-react';
import { usePayments } from '../../context/PaymentContext';
import ConfirmDialog from '../common/ConfirmDialog';

const PaymentDetail = ({ payment }) => {
  const { refundPayment, loading } = usePayments();
  const [showRefundConfirm, setShowRefundConfirm] = useState(false);

  if (!payment) {
    return (
      <div className="card">
        <p className="text-gray-500 text-center py-8">
          Seleccione una orden para ver los detalles del pago
        </p>
      </div>
    );
  }

  const handleRefund = async () => {
    try {
      await refundPayment(payment.id);
      setShowRefundConfirm(false);
    } catch (err) {
      // Manejado por el interceptor
    }
  };

  const canRefund = payment.estado === 'PROCESADO';

  return (
    <>
      <div className="card">
        <h3 className="text-xl font-bold text-gray-800 mb-4">Detalle del Pago</h3>

        <div className="space-y-3">
          <div>
            <p className="text-sm text-gray-500">ID de Pago</p>
            <p className="font-semibold text-gray-900">{payment.id}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Orden ID</p>
            <p className="font-semibold text-gray-900">{payment.ordenId}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Monto</p>
            <p className="font-semibold text-gray-900">${payment.monto?.toFixed(2)}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Método de Pago</p>
            <p className="font-semibold text-gray-900">{payment.metodoPago}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Estado</p>
            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
              payment.estado === 'PROCESADO' ? 'bg-green-100 text-green-800' :
              payment.estado === 'REEMBOLSADO' ? 'bg-red-100 text-red-800' :
              'bg-gray-100 text-gray-800'
            }`}>
              {payment.estado}
            </span>
          </div>
        </div>

        {canRefund && (
          <div className="mt-6 pt-6 border-t">
            <button
              onClick={() => setShowRefundConfirm(true)}
              disabled={loading}
              className="btn-danger inline-flex items-center gap-2 w-full justify-center disabled:opacity-50"
            >
              <RefreshCw size={16} />
              Reembolsar Pago
            </button>
          </div>
        )}
      </div>

      <ConfirmDialog
        isOpen={showRefundConfirm}
        title="Confirmar Reembolso"
        message={`¿Está seguro que desea reembolsar el pago de $${payment.monto?.toFixed(2)}? Esta acción no se puede deshacer.`}
        confirmText="Reembolsar"
        cancelText="Cancelar"
        onConfirm={handleRefund}
        onCancel={() => setShowRefundConfirm(false)}
        confirmButtonClass="btn-danger"
        icon={<AlertTriangle className="text-danger-600" size={48} />}
      />
    </>
  );
};

export default PaymentDetail;
