import React, { useState, useEffect } from 'react';
import './AppointmentList.css';
import newRequest from '../../utils/newRequest';

function AppointmentList({ doctorId }) {

  const [appointments, setAppointments] = useState({});
  const [isEmpty, setIsEmpty] = useState(false);


  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const res = await newRequest.get(`/appointment/doctor/${doctorId}`);
        const fetchedAppointments = res.data.appointments;

        console.log('data', res.data)
        console.log('appointments: ', fetchedAppointments)

        if (fetchedAppointments.length == 0) setIsEmpty(true);

        setAppointments(fetchedAppointments);
      }catch (error) {
        console.log('Error fetching appointments: ', error);
      }
    }

    fetchAppointments();
  }, [])

  return (
    <div className="appointment-list">
      <ul>
        {/* {appointments.map((appointment) => (
          <li key={appointment.id}>
            <span>{appointment.patient}</span>
            <span>{appointment.date}</span>
            <span>{appointment.time}</span>
          </li>
        ))} */}
      </ul>
    </div>
  );
}

export default AppointmentList;
