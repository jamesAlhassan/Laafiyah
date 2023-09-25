import React, { useState } from 'react';
import './DoctorProfile.css';

function DoctorProfile({ doctorData }) {
  const [formData, setFormData] = useState(doctorData);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleUpdateProfile = () => {
    // Implement the logic to update the doctor's profile on the backend
    // Send formData to the backend to update the doctor's data
  };

  return (
    <div className="doctor-profile">
      <h2>Doctor Profile</h2>
      <div className="profile-picture">
        {/* Add profile picture here */}
        <img src={doctorData.profilePicture} alt="Doctor's Profile" />
        {/* Input to upload or change profile picture */}
        <input type="file" name="profilePicture" accept="image/*" onChange={handleInputChange} />
      </div>
      <div className="profile-info">
        <form onSubmit={handleUpdateProfile}>
          {/* Display doctor's information and input fields for updating */}
          <div className="form-group">
            <label>Title:</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
            />
          </div>
          {/* Add similar input fields for other doctor details */}
          {/* ... */}
          <button type="submit">Update Profile</button>
        </form>
      </div>
    </div>
  );
}

export default DoctorProfile;
