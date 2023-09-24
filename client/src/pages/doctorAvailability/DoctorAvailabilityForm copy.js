import React, { useState } from 'react';
import './DoctorAvailabilityForm.css';
import newRequest from '../../utils/newRequest';

function DoctorAvailabilityForm() {
  const [availability, setAvailability] = useState([]); // Store availability data
  const [selectedDay, setSelectedDay] = useState('Monday');
  const [timeSlot, setTimeSlot] = useState('');

  const handleAddTimeSlot = () => {
    if (timeSlot.trim() !== '') {
      // Check if the day already exists in the availability array
      const existingDayIndex = availability.findIndex((item) => item.day === selectedDay);

      if (existingDayIndex !== -1) {
        // Day already exists, update its slots
        const updatedAvailability = [...availability];

        if (updatedAvailability[existingDayIndex].timeslots.indexOf(timeSlot) === -1) {
          updatedAvailability[existingDayIndex].timeslots.push(timeSlot);

          // Define the order of days of the week
          const daysOfWeekOrder = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
          // Create an array to store the days and timeslots
          const sortedSchedule = [];
          // Sort the schedule by day based on the order defined
          updatedAvailability.forEach(item => {
            const day = item.day;
            const slots = item.timeslots;
            // Sort timeslots for each day
            slots.sort();
            // Push the day and sorted timeslots to the sortedSchedule array
            sortedSchedule.push({
              "day": day,
              "timeslots": slots
            });
          });

          // Sort the sortedSchedule array based on the custom order
          sortedSchedule.sort((a, b) => {
            return daysOfWeekOrder.indexOf(a.day) - daysOfWeekOrder.indexOf(b.day);
          });
          setAvailability(sortedSchedule);
        }
      } else {
        // Day doesn't exist, create a new entry
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
    // add availability to the backend
    console.log('Availability Data:', availability);

    const newAvailability = {
      availability
    }

    console.log('newAvailabilit: ', newAvailability)

    try {
      await newRequest.post('/availability/650c91445b7123e150ec28de', { availability })
        .then((res) => {
          console.log('availability added');

          console.log(res.data);
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {
      console.log(error);
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
          {availability?.map((item) => (
            <div className='availability-item' key={item.day}>
              <p>
                {item.day}:
                <button type="button" onClick={() => handleDeleteDay(item.day)}>
                  Delete
                </button>
              </p>
              <ul>
                {item.timeslots.map((slot, index) => (
                  <li key={index}>
                    {slot}
                    <button
                      type="button"
                      onClick={() => {
                        handleRemoveTimeSlot(item.day, slot);
                      }}
                    >
                      X
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default DoctorAvailabilityForm;
