import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import './ConfirmBooking.css';
import ConfirmBookingModal from "../../components/modals/ConfirmBookingModal";
import DoctorSummary from "../../components/doctorSummary/DoctorSummary";
import formatDate from "../../utils/formatDate";
import newRequest from "../../utils/newRequest";

const ConfirmBooking = () => {

    const [showModal, setShowModal] = useState(false);
    const [isButtonDisabled, setIsButtonDisabled] = useState(false);
    const [isInputDisabled, setIsInputDisabled] = useState(false);
    const [phone, setPhone] = useState('');
    const [notes, setNotes] = useState('');
    const location = useLocation();
    const { appointment, doctor } = location.state || {};

    const navigate = useNavigate();

    const handleContinue = async (e) => {
        e.preventDefault();

        // add appointment to database
        try {
            const finalAppointment = ({
                doctor: doctor._id,
                status: "pending",
                day: appointment.day,
                time: appointment.time,
                notes
            });

            await newRequest.post('/appointment', { ...finalAppointment })
                .then((res) => {
                    console.log('Appointment added successfully');
                    setIsButtonDisabled(true);
                    setIsInputDisabled(true);
                    setShowModal(true);
                })
                .catch((error) => {
                    console.log(error);
                });
        } catch (error) {
            console.log(error);
        }
    }

    const handleCloseModal = () => {
        setShowModal(false);
        // Close the modal and redirect to the dashboard
        navigate('/');
    };

    return (
        <div className="confirm-booking">
            <div className="confirm-booking-container">
                <div className="booking-details">
                    <li><h4>In Clinic Appointment</h4></li>
                    <li>
                        <p>On {formatDate(appointment.day)} <br />
                            Change Date & Time</p>
                        <p>at {appointment.time}</p>
                    </li>
                    <li>
                        <DoctorSummary key={doctor._id} doctor={doctor} />
                    </li>
                </div>

                <div className="enter-phone">

                    <form onSubmit={(e) => e.preventDefault()}>
                        <h4>Enter phone Number</h4>
                        {/* Phone Number */}
                        <label htmlFor="phone">Phone number</label>
                        <input
                            type="text"
                            id="phone"
                            name="phone"
                            disabled={isInputDisabled}
                            value={phone}
                            placeholder="enter phone number"
                            onChange={(e) => setPhone(e.target.value)}
                            required
                        />
                        {/* Addtional info */}
                        <label htmlFor="notes">Add any addtional information</label>
                        <textarea
                            type="text"
                            id="notes"
                            name="notes"
                            value={notes}
                            rows="8"
                            cols="50"
                            placeholder='Add any addtional Info'
                            onChange={(e) => setNotes(e.target.value)}>
                        </textarea><br />
                        <button type="button" disabled={isButtonDisabled}
                            onClick={handleContinue}>
                            Continue
                        </button>
                    </form>
                </div>
                {/* Render the confirmation modal */}
                {showModal && (
                    <ConfirmBookingModal
                        onClose={handleCloseModal} />
                )}
            </div>
        </div>
    )
}

export default ConfirmBooking;