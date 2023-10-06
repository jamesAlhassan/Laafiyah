import React, { useState, useEffect } from "react";
import { BiSolidMessageAlt, BiSolidCommentAdd } from 'react-icons/bi';
import { BsEyeFill } from 'react-icons/bs';
import "../doctorDashboard/AppointmentList.css";
import formatDate from "../../utils/formatDate";
import newRequest from "../../utils/newRequest";
import PatientAppointmentModal from "../../components/modals/PatientAppointmentModal";
import ReviewModal from "../../components/modals/ReviewModal";

const PatientAppointments = ({ patientId }) => {
  const [appointments, setAppointments] = useState([]);
  const [isEmpty, setIsEmpty] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [reviewContent, setReviewContent] = useState({});
  const [openReview, setOpenReview] = useState(false);
  const [openDetails, setOpenDetails] = useState(false);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [reviewMessage, setReviewMessage] = useState('');

  const handleAction = (appointment) => {
    // close modal if it is already openend b4 opening this one
    setOpenReview(false);
    setOpenDetails(true);
    setSelectedAppointment(appointment);
  };

  const handleCloseModal = () => {
    // closes any opened modal
    setSelectedAppointment(null);
    setOpenDetails(false);
    setOpenReview(false);
    // Clear the review message after closing the modal
    setReviewMessage('');
  };

  const handleViewDoctor = async () => {
    // update appointment status
    const res = await newRequest.patch(
      `/appointment/${selectedAppointment._id}`,
      { status: selectedAppointment.status }
    );
  };

  const openReviewModal = (appointment) => {
    // close modal if it is already openend b4 opening this one
    setOpenDetails(false);
    setSelectedAppointment(appointment);
    setOpenReview(true);
  }

  const addReview = async (reviewItem) => {

    const review = {
      ...reviewItem,
      doctor: selectedAppointment.doctor._id,
    }

    try {
      // add review
      const res = await newRequest.post('/review', review)
        .then((res) => setReviewMessage("Review has been added successfullly"))
        .catch((error) => {
          const errorMessage = error.response?.data?.msg || 'An error occurred';
          setReviewMessage(errorMessage);
        })

    } catch (error) {
      // Handle error
      console.error('Error adding review:', error);
      setReviewMessage('Error adding review. Please try again.');
    }
  }

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const res = await newRequest.get(`/appointment/patient/${patientId}`);
        const fetchedAppointments = res.data.appointments;
        console.log("appointments: ", fetchedAppointments);

        if (fetchedAppointments.length === 0) setIsEmpty(true);

        setAppointments(fetchedAppointments);
      } catch (error) {
        console.log("Error fetching appointments: ", error);
        setError("Error fetching appointments");
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, [patientId]);

  // set bg colour for appointment status
  const getStatusClass = (status) => {
    switch (status) {
      case "pending":
        return "pending";
      case "approved":
        return "approved";
      case "declined":
        return "declined";
      default:
        return "";
    }
  };

  return (
    <div className="appointment-list">
      <h4>Your Appointments: </h4>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {!loading && !error && (
        <>
          {appointments.length > 0 ? (
            <table>
              <thead>
                <tr>
                  <th>Doctor</th>
                  <th>Day</th>
                  <th>Time</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {appointments.map((appointment) => (
                  <tr
                    key={appointment._id}
                  >
                    <td>
                      {appointment.doctor.title}{" "}
                      {appointment.doctor.firstName}{" "}
                      {appointment.doctor.lastName}
                    </td>
                    <td>{formatDate(appointment.day)}</td>
                    <td>{appointment.time}</td>
                    <td>
                      <div className={getStatusClass(appointment.status)}>
                        {appointment.status}
                      </div>
                    </td>
                    <td>
                      <BiSolidMessageAlt className="table-icons blue" title="Message Doctor" />
                      <BiSolidCommentAdd className="table-icons brown" title="Add Review" onClick={() => openReviewModal(appointment)} />
                      <BsEyeFill className="table-icons green" title="View" onClick={() => handleAction(appointment)} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No Appointment data. </p>
          )}
        </>
      )}

      {/* Render the Appointment modal */}
      {openDetails && (
        <PatientAppointmentModal
          appointment={selectedAppointment}
          onClose={handleCloseModal}
          onViewDoctor={handleViewDoctor}
        />
      )}

      {/* Render the Review modal */}
      {openReview && (
        <ReviewModal
          setReviewContent={setReviewContent}
          onClose={handleCloseModal}
          onViewDoctor={handleViewDoctor}
          onAddReview={addReview}
          appointment
        />
      )}

      {/* Conditionally render the review message */}
      {reviewMessage && (
        <div>
          <p>{reviewMessage}</p>
          <button onClick={() => setReviewMessage('')}>Close</button>
        </div>
      )}
    </div>
  );
};

export default PatientAppointments;
