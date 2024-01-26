import React from 'react';
import { createPortal } from 'react-dom';

import { ToastContext } from '../ToastProvider';
import Toast from '../Toast';

import styles from './ToastShelf.module.css';

function ToastShelf() {
  const { toasts } = React.useContext(ToastContext);
  return createPortal(
    <ol
      className={styles.wrapper}
      role="region"
      aria-live="polite"
      aria-label="notifications"
    >
      {toasts.map((toast) => (
        <li key={toast.id} className={styles.toastWrapper}>
          <Toast variant={toast.variant} id={toast.id}>
            {toast.message}
          </Toast>
        </li>
      ))}
    </ol>,
    document.querySelector('#toast-root')
  );
}

export default ToastShelf;
