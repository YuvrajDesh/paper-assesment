import React from 'react'

function Alert({ message, type,dismissible, onClose  }) {
  const alertClass = `alert alert-${type} ${dismissible ? 'alert-dismissible' : ''}`;

  return (
    <div className={alertClass} role="alert">
      {dismissible && (
        <button type="button" className="btn-close" aria-label="Close" onClick={onClose}></button>
      )}
      {message}
    </div>
  );
  }
  export default Alert;
