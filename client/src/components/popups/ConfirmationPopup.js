import React from 'react';
import './ConfirmationPopup.css';

const ConfirmationPopup = ({ onClose, onConfirm }) => {
  return (
    <div className="confirmation-popup">
      <p>Appointment Successful!</p>
      <button onClick={() => { onClose(); onConfirm(); }}>OK</button>
    </div>
  );
};

export default ConfirmationPopup;
