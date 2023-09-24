import React, { useState } from 'react';
import './AvailabilityList.css';
import newRequest from '../../utils/newRequest';
import { useQuery } from "@tanstack/react-query";

const AvailabilityList = ({ handleOptionClick, handleAvailabilities  }) => {
  // const [availability, setAvailability] = useState({});

  const { isLoading, error, data } = useQuery({
    queryKey: [],
    queryFn: () =>
      newRequest.get('/availability/650c91445b7123e150ec28de')
        .then((res) => {
          console.log(res.data);
          return res.data;
        })
  })
  
  const editButtonHandle = () => {
    handleAvailabilities(data);
    handleOptionClick('Profile');
  }

  // when page is loading
  if (isLoading) return <div>Loading</div>;

  // when there is an error
  if (error) {
    console.log(error.response);
    return <div>Error occured</div>
  }

  return (
    <div className="availability-calendar">
      {/* {data.availability} */}
      <table>
        <thead>
          <tr>
            <th>Day</th>
            <th>Available Slots</th>
          </tr>
        </thead>
        <tbody>
          {data.availability === undefined ? "loading" :
            (data.availability?.map((slot) => (
              <tr key={slot.day}>
                <td>{slot.day}</td>
                <td>{slot.timeslots.join(', ')}</td>
              </tr>)
            ))}
        </tbody>
      </table>
      <button onClick={() => editButtonHandle}>Edit Availabilities</button>
    </div>
  );
}

export default AvailabilityList;
