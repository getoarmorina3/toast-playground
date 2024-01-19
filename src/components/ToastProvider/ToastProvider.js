import React from 'react';

import useKeydown from '../../hooks/use-keydown';

export const ToastContext = React.createContext();

function ToastProvider({ children }) {
  const [toasts, setToasts] = React.useState([
    {
      id: crypto.randomUUID(),
      message: 'This is a notice toast',
      variant: 'notice',
    },
    {
      id: crypto.randomUUID(),
      message: 'This is a warning toast',
      variant: 'warning',
    },
    {
      id: crypto.randomUUID(),
      message: 'This is a success toast',
      variant: 'success',
    },
    {
      id: crypto.randomUUID(),
      message: 'This is an error toast',
      variant: 'error',
    },
  ]);

  function createToast(message, variant) {
    const nextToasts = [
      ...toasts,
      {
        id: crypto.randomUUID(),
        message,
        variant,
      },
    ];

    setToasts(nextToasts);
  }

  function dismissToast(id) {
    const nextToasts = toasts.filter((toast) => toast.id !== id);

    setToasts(nextToasts);
  }

  const handleEscape = React.useCallback(() => {
    setToasts([]);
  }, []);

  useKeydown('Escape', handleEscape);
  /*
    Now I can use the custom generic hook
    with different keys and callbacks aswell
    e.g useKeydown('Enter', differentCallback);
  */

  return (
    <ToastContext.Provider value={{ toasts, createToast, dismissToast }}>
      {children}
    </ToastContext.Provider>
  );
}

export default ToastProvider;
