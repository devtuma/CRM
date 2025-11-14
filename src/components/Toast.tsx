import React, { useEffect } from 'react';
import { CheckCircle, XCircle, AlertCircle, Info, X } from 'lucide-react';

export type ToastType = 'success' | 'error' | 'warning' | 'info';

interface ToastProps {
  message: string;
  type: ToastType;
  onClose: () => void;
  duration?: number;
}

const Toast: React.FC<ToastProps> = ({ message, type, onClose, duration = 3000 }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const config = {
    success: {
      icon: CheckCircle,
      className: 'bg-green-50 border-green-500 text-green-900',
      iconColor: 'text-green-500',
    },
    error: {
      icon: XCircle,
      className: 'bg-red-50 border-red-500 text-red-900',
      iconColor: 'text-red-500',
    },
    warning: {
      icon: AlertCircle,
      className: 'bg-yellow-50 border-yellow-500 text-yellow-900',
      iconColor: 'text-yellow-500',
    },
    info: {
      icon: Info,
      className: 'bg-blue-50 border-blue-500 text-blue-900',
      iconColor: 'text-blue-500',
    },
  };

  const { icon: Icon, className, iconColor } = config[type];

  return (
    <div className={`${className} border-l-4 rounded-lg p-4 shadow-lg flex items-start gap-3 min-w-[300px] max-w-md animate-slide-in`}>
      <Icon className={`${iconColor} flex-shrink-0 mt-0.5`} size={20} />
      <p className="flex-1 text-sm font-medium">{message}</p>
      <button
        onClick={onClose}
        className="text-gray-500 hover:text-gray-700 flex-shrink-0"
      >
        <X size={18} />
      </button>
    </div>
  );
};

export default Toast;
