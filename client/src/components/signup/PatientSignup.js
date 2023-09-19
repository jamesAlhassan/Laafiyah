import React, { useState } from 'react';
import "./SignUp.css";
import newRequest from '../../utils/newRequest';

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

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // construct a user object with the form data, default role is doctor
    const userData = {
      email,
      password,
      role: 'patient'
    }

    // Construct a doctor object with form data
    const doctorData = {
      firstName,
      lastName,
      dateOfBirth,
      gender,
      phoneNumber,
      location,
    };

    try {
      // add user to database and add doctor profile to database
      const res = await newRequest.post('/auth/register', { ...userData });
      console.log("After inserting user", res.data);
      
      // store the result in the localStorage of browser
      localStorage.setItem("currentUser", JSON.stringify(res.data));
      const currentUser = JSON.parse(localStorage.getItem("currentUser"));
      console.log("current User", currentUser);

      const res2 = await newRequest.post('/doctor', { user: currentUser.id, ...doctorData });
      console.log("after inserting doctor", res2.data);

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='doctorForm'>
      <h4>Patient Registration</h4>
      <form onSubmit={handleSubmit}>
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
        /><br/>

        {/* Submit Button */}
        <button type="submit">Register Patient</button>
      </form>
    </div>
  );
}

export default PatientRegistrationForm;