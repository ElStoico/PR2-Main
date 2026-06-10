import { AlertCircle, RefreshCw } from 'lucide-react';

const ErrorMessage = ({ message, onRetry }) => {
  return (
    <div className="card bg-red-50 border border-red-200">
      <div className="flex flex-col items-center justify-center py-8">
        <AlertCircle className="text-red-600 mb-4" size={48} />
        <p className="text-red-800 font-semibold mb-2">Error</p>
        <p className="text-red-600 text-center mb-4">{message}</p>
        {onRetry && (
          <button
            onClick={onRetry}
            className="btn-primary inline-flex items-center gap-2"
          >
            <RefreshCw size={16} />
            Reintentar
          </button>
        )}
      </div>
    </div>
  );
};

export default ErrorMessage;
