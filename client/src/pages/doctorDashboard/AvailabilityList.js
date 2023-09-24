import React from 'react';
import './AvailabilityList.css';

function AvailabilityList({ availability }) {
  return (
    <div className="availability-calendar">
      <table>
        <thead>
          <tr>
            <th>Day</th>
            <th>Available Slots</th>
          </tr>
        </thead>
        <tbody>
          {availability.map((slot) => (
            <tr key={slot.day}>
              <td>{slot.day}</td>
              <td>{slot.slots.join(', ')}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AvailabilityList;
