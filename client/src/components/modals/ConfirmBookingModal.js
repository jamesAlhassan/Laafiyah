import React from 'react';

const ConfirmBookingModal = ({ onClose }) => {

  // close the modal
  const handleClose = () => onClose();

  return (
    <div className='modal-overlay'>
      <div className='modal'>
        <div className='modal-header'>
          <h4>Booking successful</h4>
        </div>
        <div className='modal-body'>
          <button onClick={handleClose}>Ok</button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmBookingModal;
