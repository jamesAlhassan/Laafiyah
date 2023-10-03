import React, { useState, useEffect } from "react";
import "../doctorDashboard/AppointmentList.css";
import newRequest from "../../utils/newRequest";
import PatientAppointmentModal from "../../components/modals/PatientAppointmentModal";

const PatientAppointments = ({ patientId }) => {
  const [appointments, setAppointments] = useState([]);
  const [isEmpty, setIsEmpty] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedAppointment, setSelectedAppointment] = useState(null);

  const handleAction = (appointment) => {
    setSelectedAppointment(appointment);
  };

  const handleCloseModal = () => {
    setSelectedAppointment(null);
  };

  const handleViewDoctor = async () => {
    // update appointment status
    const res = await newRequest.patch(
      `/appointment/${selectedAppointment._id}`,
      { status: selectedAppointment.status }
    );
  };

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
                    onClick={() => handleAction(appointment)}
                  >
                    <td>
                      {appointment.doctor.title}{" "}
                      {appointment.doctor.firstName}{" "}
                      {appointment.doctor.lastName}
                    </td>
                    <td>{appointment.day}</td>
                    <td>{appointment.time}</td>
                    <td>
                      <div className={getStatusClass(appointment.status)}>
                        {appointment.status}
                      </div>
                    </td>
                    <td>
                      <button>message</button>
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
      {selectedAppointment && (
        <PatientAppointmentModal
          appointment={selectedAppointment}
          onClose={handleCloseModal}
          onViewDoctor={handleViewDoctor}
        />
      )}
    </div>
  );
};

export default PatientAppointments;
