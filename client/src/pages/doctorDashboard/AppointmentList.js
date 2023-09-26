import React from 'react';
import './AppointmentList.css';

function AppointmentList({ appointments }) {
  return (
    <div className="appointment-list">
      <ul>
        {appointments.map((appointment) => (
          <li key={appointment.id}>
            <span>{appointment.patient}</span>
            <span>{appointment.date}</span>
            <span>{appointment.time}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AppointmentList;
