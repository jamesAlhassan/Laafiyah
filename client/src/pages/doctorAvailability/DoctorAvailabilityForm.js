import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import './DoctorAvailabilityForm.css';
import './Calendar.css';
import newRequest from '../../utils/newRequest';

function DoctorAvailabilityForm({ doctorId }) {
  const [availability, setAvailability] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [timeSlot, setTimeSlot] = useState('');
  const [isEmpty, setIsEmpty] = useState(false);

  useEffect(() => {
    const fetchAvailability = async () => {
      try {
        const response = await newRequest.get(`/availability/${doctorId}`);
        const fetchedAvailability = response.data.availability || [];

        setIsEmpty(fetchedAvailability.length === 0);
        setAvailability(sortAvailability(fetchedAvailability));
      } catch (error) {
        console.error('Error fetching availability:', error);
      }
    };

    fetchAvailability();
  }, [doctorId]);

  const sortAvailability = (data) => {
    return [...data].sort((a, b) => new Date(a.day) - new Date(b.day));
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const handleAddTimeSlot = () => {
    if (timeSlot.trim() === '') return;

    const existingDayIndex = availability.findIndex((item) => item.day === selectedDate.toLocaleDateString());

    if (existingDayIndex !== -1) {
      const updatedAvailability = [...availability];

      if (!updatedAvailability[existingDayIndex].timeslots.includes(timeSlot)) {
        updatedAvailability[existingDayIndex].timeslots.push(timeSlot);
        updatedAvailability.sort((a, b) => new Date(a.day) - new Date(b.day));
        setAvailability(updatedAvailability);
      }
    } else {
      setAvailability([...availability, { day: selectedDate.toLocaleDateString(), timeslots: [timeSlot] }]);
    }

    setTimeSlot('');
  };

  const handleRemoveTimeSlot = (day, slot) => {
    const dayIndex = availability.findIndex((item) => item.day === day);
    if (dayIndex !== -1) {
      const updatedAvailability = [...availability];
      const updatedSlots = availability[dayIndex].timeslots.filter((item) => item !== slot);

      if (updatedSlots.length === 0) {
        handleDeleteDay(day);
      } else {
        updatedAvailability[dayIndex].timeslots = updatedSlots;
        setAvailability(updatedAvailability);
      }
    }
  };

  const handleFinish = async () => {
    const newAvailability = { availability };

    try {
      if (isEmpty) {
        await newRequest.post(`/availability/${doctorId}`, newAvailability);
        console.log('Availability created');
      } else {
        await newRequest.patch(`/availability/${doctorId}`, newAvailability);
        console.log('Availability updated');
      }
    } catch (error) {
      console.error('Error:', error);
    }

    if (availability.every((day) => day.timeslots.length === 0)) {
      try {
        await newRequest.delete(`/availability/${doctorId}`);
        console.log('Availability deleted');
      } catch (error) {
        console.error('Error deleting availability:', error);
      }
    }
  };

  const handleDeleteDay = (dayToRemove) => {
    const updatedAvailability = availability.filter((item) => item.day !== dayToRemove);
    setAvailability(updatedAvailability);
  };

  return (
    <div className="availability-form">
      <div className='container'>
        <form onSubmit={(e) => e.preventDefault()}>
          <h4>Set Availability</h4>
          <div className="form-group">
            <label>Date:</label>
            <Calendar
              className="date-calendar"
              onChange={setSelectedDate}
              value={selectedDate}
            />
          </div>
          <div className="form-group">
            <label>Time Slots:</label>
            <div className="time-slot-input">
              <input
                type="time"
                value={timeSlot}
                onChange={(e) => setTimeSlot(e.target.value)}
              />
              <button type="button" onClick={handleAddTimeSlot}>
                Add
              </button>
            </div>
          </div>
          <button type="button" onClick={handleFinish}>
            Finish
          </button>
        </form>
        <div className="saved-availability">
          <h4>Availabilities:</h4>
          {availability?.length > 0 ? (
            <table>
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Time Slots</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {availability.map((item) => (
                  <tr key={item.day}>
                    <td>{formatDate(item.day)}</td>
                    <td>
                      <ul>
                        {item.timeslots.map((slot, index) => (
                          <li key={index}>
                            {slot}
                            <button
                              type="button"
                              onClick={() => handleRemoveTimeSlot(item.day, slot)}
                            >
                              X
                            </button>
                          </li>
                        ))}
                      </ul>
                    </td>
                    <td>
                      <button
                        type="button"
                        onClick={() => handleDeleteDay(item.day)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No availability data.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default DoctorAvailabilityForm;