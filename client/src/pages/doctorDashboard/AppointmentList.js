import React, { useState, useEffect } from 'react';
import './AppointmentList.css';
import newRequest from '../../utils/newRequest';

function AppointmentList({ doctorId }) {

  const [appointments, setAppointments] = useState([]);
  const [isEmpty, setIsEmpty] = useState(false);


  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const res = await newRequest.get(`/appointment/doctor/${doctorId}`);
        const fetchedAppointments = res.data.appointments;
        console.log('appointments: ', fetchedAppointments)

        if (fetchedAppointments.length == 0) setIsEmpty(true);

        setAppointments(fetchedAppointments);
      } catch (error) {
        console.log('Error fetching appointments: ', error);
      }
    }

    fetchAppointments();
  }, [])

  const handleAction = (appointment) => {
    console.log("this appointment is clicked", appointment);
  }

  return (
    <div className="appointment-list">
      <h4>Your Appointments: </h4>
      {appointments.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Patient</th>
              <th>Day</th>
              <th>Time</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((appointment) => (
              <tr key={appointment._id}>
                <td>{appointment.patient.firstName} {appointment.patient.lastName}</td>
                <td>{appointment.day}</td>
                <td>{appointment.time}</td>
                <td>{appointment.status}</td>
                <td>
                  <button onClick={() => handleAction(appointment)}>
                    Action
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No Appointment data. </p>
      )}
    </div>
  );
}

export default AppointmentList;
