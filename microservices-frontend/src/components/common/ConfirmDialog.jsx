import { X } from 'lucide-react';

const ConfirmDialog = ({
  isOpen,
  title,
  message,
  confirmText = 'Confirmar',
  cancelText = 'Cancelar',
  onConfirm,
  onCancel,
  confirmButtonClass = 'btn-primary',
  icon = null,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
        <div className="flex justify-between items-start p-6 border-b">
          <h3 className="text-xl font-bold text-gray-900">{title}</h3>
          <button onClick={onCancel} className="text-gray-400 hover:text-gray-600">
            <X size={24} />
          </button>
        </div>

        <div className="p-6">
          {icon && <div className="flex justify-center mb-4">{icon}</div>}
          <p className="text-gray-700 text-center">{message}</p>
        </div>

        <div className="flex gap-3 p-6 border-t">
          <button onClick={onCancel} className="btn bg-gray-200 text-gray-700 hover:bg-gray-300 flex-1">
            {cancelText}
          </button>
          <button onClick={onConfirm} className={`${confirmButtonClass} flex-1`}>
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDialog;
