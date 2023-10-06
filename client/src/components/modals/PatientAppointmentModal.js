import React, { useState } from 'react';
import './AppointmentModal.css';
import formatDate from '../../utils/formatDate';

const PatientAppointmentModal = ({ appointment, onClose, onViewDoctor }) => {
    const [feedback, setFeedback] = useState('');

    // close the modal
    const handleClose = () => onClose();

    const handleViewDoctor = () => {
        onViewDoctor();
        onClose();
    }

    return (
        <div className="modal-overlay">
            <div className="modal">
                <div className="modal-header">
                    <h3>Appointment</h3>
                    <button onClick={onClose}>&times;</button>
                </div>
                <div className="modal-body">
                    <h4>Doctor Details</h4>
                    <p><b>Name: </b>{appointment.doctor.title} {appointment.doctor.firstName} {appointment.doctor.lastName}</p>
                    <p><b>Phone Number:</b> {appointment.doctor.phoneNumber}</p>
                    <p><b>Gender:</b> {appointment.doctor.gender}</p>
                    <p><b>Hospital: </b>{appointment.doctor.hospitalAffiliation}</p>

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
                        <button onClick={handleViewDoctor}>View Doctor</button>
                        <button onClick={handleClose}>Close</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PatientAppointmentModal;
