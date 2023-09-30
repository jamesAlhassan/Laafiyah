import React from 'react';
import Modal from 'react-modal';

const ConfirmBookingModal = ({ isOpen, onRequestClose, onConfirm }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Confirmation Modal"
    >
      <p>Appointment Successful!</p>
      <button onClick={() => { onRequestClose(); onConfirm(); }}>OK</button>
    </Modal>
  );
};

export default ConfirmBookingModal;
