import React, { useState } from 'react';
import "./SignUp.css";
import newRequest from '../../utils/newRequest';
import { useNavigate } from 'react-router-dom';

function PatientRegistrationForm() {
  // Define state variables for form fields
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [gender, setGender] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [location, setLocation] = useState('');
  const [error, setError] = useState(null); // New state for error

  const navigate = useNavigate();

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Construct a user object with the form data, default role is patient
    const userData = {
      email,
      password,
      role: 'patient'
    };

    // Construct a patient object with form data
    const patientData = {
      firstName,
      lastName,
      dateOfBirth,
      gender,
      phoneNumber,
      location,
    };

    try {
      let userResponse;
      // Add user to the User collection
      await newRequest.post('/auth/register', { ...userData })
        .then((res) => {
          console.log('User added successfully');
          localStorage.setItem("currentUser", JSON.stringify(res.data));
          userResponse = res;

          // Add the patient to the patient collection only if the user registration is successful
          return newRequest.post('/patient', { ...patientData });
        })
        .then(() => {
          console.log('Patient added successfully');
          navigate("/");
        })
        .catch(async (error) => {
          // Handle errors and update the state with the error message
          const errorMessage = error.response?.data?.msg || 'An error occurred';
          setError(errorMessage);

          // if there was an error adding the doctor, delete the doctor
          if (userResponse) {
            const userId = userResponse.data.user.user;
            await newRequest.delete(`/auth/delete/${userId}`)
              .then(() => console.log('User deleted successfully'))
              .catch((deleteError) => console.log('Error deleting user: ', deleteError));
          }
        });

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='signup-form-container'>
      <h4>Patient Registration</h4>
      {/* Render error message if exists */}
      {error && <div className='error'>{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className='left-side'>
          {/* First Name */}
          <label htmlFor="firstName">First Name:</label>
          <input
            type="text"
            id="firstName"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          /><br />

          {/* Last Name */}
          <label htmlFor="lastName">Last Name:</label>
          <input
            type="text"
            id="lastName"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          /><br />
          {/* Date of Birth */}
          <label htmlFor="dateOfBirth">Date of Birth:</label>
          <input
            type="date"
            id="dateOfBirth"
            value={dateOfBirth}
            onChange={(e) => setDateOfBirth(e.target.value)}
            required
          /><br />

          {/* Gender */}
          <label htmlFor="gender">Gender:</label>
          <select
            id="gender"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            required
          >
            <option value="">Select Gender</option>
            <option value="male">male</option>
            <option value="female">female</option>
          </select>

        </div>

        <div className='right-side'>
          {/* Email */}
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          /><br />

          {/* password */}
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          /><br />

          {/* Phone Number */}
          <label htmlFor="phoneNumber">Phone Number:</label>
          <input
            type="tel"
            id="phoneNumber"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            required
          /><br />

          {/* Location */}
          <label htmlFor="location">Location:</label>
          <input
            type="text"
            id="location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
          /><br />

          {/* Submit Button */}
          <button type="submit">Register Patient</button>
        </div>
      </form>
    </div>
  );
}

export default PatientRegistrationForm;