import React, { useState } from 'react';
import './AppointmentModal.css';
import formatDate from '../../utils/formatDate';

const AppointmentModal = ({ appointment, onClose, onUpdate }) => {
    const [feedback, setFeedback] = useState('');

    // close the modal
    const handleClose = () => onClose();

    const handleApprove = () => {
        appointment.status = 'approved';
        onUpdate();
        onClose();
    };

    const handleReject = () => {
        appointment.status = 'declined';
        onUpdate();
        onClose();
    };

    return (
        <div className="modal-overlay">
            <div className="modal">
                <div className="modal-header">
                    <h3>Confirm Appointment</h3>
                    <button onClick={onClose}>&times;</button>
                </div>
                <div className="modal-body">
                    <h4>Patient Details</h4>
                    <p><b>Name: </b> {appointment.patient.firstName} {appointment.patient.lastName}</p>
                    <p><b>Phone Number:</b> {appointment.patient.phoneNumber}</p>
                    <p><b>Date of Birth:</b> {appointment.patient.dateOfBirth.substr(0, 10)}</p>
                    <p><b>Gender:</b> {appointment.patient.gender}</p>

                    <h4>Appointment Details</h4>
                    <p><b>Day: </b>{formatDate(appointment.day)}</p>
                    <p><b>Time: </b> {appointment.time}</p>
                    <p><b>Status: </b> {appointment.status}</p>
                    <p><b>Notes: </b>{appointment.notes}</p>

                    <h4>Doctor's Feedback</h4>
                    <textarea
                        value={feedback}
                        onChange={(e) => setFeedback(e.target.value)}
                        placeholder="Provide feedback..."
                    ></textarea>

                    <div className="modal-actions">
                        <button onClick={handleApprove}>Approve</button>
                        <button onClick={handleReject}>Decline</button>
                        <button onClick={handleClose}>Close</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AppointmentModal;
