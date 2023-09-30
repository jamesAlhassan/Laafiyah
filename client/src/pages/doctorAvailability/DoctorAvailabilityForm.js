import React, { useState, useEffect } from 'react';
import './DoctorAvailabilityForm.css';
import newRequest from '../../utils/newRequest';

function DoctorAvailabilityForm({ doctorId }) {
  const [availability, setAvailability] = useState([]); // Store availability data
  const [selectedDay, setSelectedDay] = useState('Monday');
  const [timeSlot, setTimeSlot] = useState('');
  const [isEmpty, setIsEmpty] = useState(false);

  useEffect(() => {
    // Fetch availability data from the database when the component mounts
    const fetchAvailability = async () => {
      try {
        const response = await newRequest.get(`/availability/${doctorId}`);
        const fetchedAvailability = response.data.availability || [];

        if(fetchedAvailability.length == 0) setIsEmpty(true);

        // Sort and set the fetched availability
        setAvailability(sortAvailability(fetchedAvailability));
      } catch (error) {
        console.error('Error fetching availability:', error);
      }
    };

    fetchAvailability();
  }, []);

  function sortAvailability(data) {
    const daysOfWeekOrder = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

    // Sort the data by day based on the custom order
    data.sort((a, b) => {
      return daysOfWeekOrder.indexOf(a.day) - daysOfWeekOrder.indexOf(b.day);
    });

    return data;
  }

  const handleAddTimeSlot = () => {
    if (timeSlot.trim() !== '') {
      const existingDayIndex = availability.findIndex((item) => item.day === selectedDay);

      if (existingDayIndex !== -1) {
        const updatedAvailability = [...availability];

        if (updatedAvailability[existingDayIndex].timeslots.indexOf(timeSlot) === -1) {
          updatedAvailability[existingDayIndex].timeslots.push(timeSlot);

          const daysOfWeekOrder = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
          const sortedSchedule = [];

          updatedAvailability.forEach(item => {
            const day = item.day;
            const slots = item.timeslots;
            slots.sort();
            sortedSchedule.push({
              "day": day,
              "timeslots": slots
            });
          });

          sortedSchedule.sort((a, b) => {
            return daysOfWeekOrder.indexOf(a.day) - daysOfWeekOrder.indexOf(b.day);
          });
          setAvailability(sortedSchedule);
        }
      } else {
        setAvailability([...availability, { day: selectedDay, timeslots: [timeSlot] }]);
      }

      setTimeSlot('');
    }
  };

  // Function to handle removing time slots
  const handleRemoveTimeSlot = (day, slot) => {
    // Find the day to update in the availability array
    const dayIndex = availability.findIndex((item) => item.day === day);
    if (dayIndex !== -1) {
      const updatedAvailability = [...availability];

      const updatedSlots = availability[dayIndex].timeslots.filter((item) => item !== slot);
      updatedAvailability[dayIndex].timeslots = updatedSlots;

      // if slots are empty, remove day
      if (updatedAvailability[dayIndex].timeslots.length === 0) handleDeleteDay(day);
      else setAvailability(updatedAvailability);
    }
  };

  const handleFinish = async () => {
    const newAvailability = {
      availability
    };

    try {
      if (isEmpty) {
        // No data exists, use POST to create new availability
        await newRequest.post(`/availability/${doctorId}`, newAvailability);
        console.log('Availability created');
      } else {
        // Data already exists, use PATCH to update it
        await newRequest.patch(`/availability/${doctorId}`, newAvailability);
        console.log('Availability updated');
      }
    } catch (error) {
      console.error('Error:', error);
    }

    // If all time slots are deleted, remove data from the database
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
            <label>Day of the Week:</label>
            <select
              value={selectedDay}
              onChange={(e) => setSelectedDay(e.target.value)}
            >
              <option value="Monday">Monday</option>
              <option value="Tuesday">Tuesday</option>
              <option value="Wednesday">Wednesday</option>
              <option value="Thursday">Thursday</option>
              <option value="Friday">Friday</option>
              <option value="Saturday">Saturday</option>
              <option value="Sunday">Sunday</option>
            </select>
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
                  <th>Day</th>
                  <th>Time Slots</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {availability.map((item) => (
                  <tr key={item.day}>
                    <td>{item.day}</td>
                    <td>
                      <ul>
                        {item.timeslots.map((slot, index) => (
                          <li key={index}>{slot}<button
                            type="button"
                            onClick={() => {
                              handleRemoveTimeSlot(item.day, slot);
                            }}
                          >
                            X
                          </button></li>
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
