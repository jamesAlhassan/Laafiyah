import React, { useState } from 'react';
import "./SignUp.css";
import newRequest from '../../utils/newRequest';
import { useNavigate } from "react-router-dom";
import MultipleValueField from '../multipleValueField/MultipleValueField';

function DoctorRegistrationForm() {
  // Define state variables for form fields
  const [title, setTitle] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [gender, setGender] = useState('');
  const [specialities, setSpecialities] = useState([]); // Store specializations in an array
  const [qualifications, setQualifications] = useState([]); // Store qualifications in an array
  const [services, setServices] = useState([]); // Store services in an array
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [location, setLocation] = useState('');
  const [licenseNumber, setLicenseNumber] = useState('');
  const [hospitalAffiliation, setHospitalAffiliation] = useState('');
  const [about, setAbout] = useState('');

  const navigate = useNavigate();

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // construct a user object with the form data, default role is doctor
    const userData = {
      email,
      password,
      role: 'doctor'
    }

    // Construct a doctor object with form data
    const doctorData = {
      title,
      firstName,
      lastName,
      dateOfBirth,
      gender,
      phoneNumber,
      location,
      qualifications,
      specialities, // Store specializations as an array
      services,
      licenseNumber,
      hospitalAffiliation,
      about
    };

    try {
      // add user to the User collection
      await newRequest.post('/auth/register', { ...userData })
        .then((res) => {
          console.log('user added');
          localStorage.setItem("currentUser", JSON.stringify(res.data));
        })
        .catch((error) => {
          console.log(error);
        });

      // add the doctor to the doctor collection
      await newRequest.post('/doctor', { ...doctorData })
        .then((res) => {
          console.log('Doctor added successfullly');
          navigate("/");
        })
        .catch((error) => {
          console.log(error);
        });

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='signUpForm'>
      <h4>Doctor Registration</h4>
      <form onSubmit={handleSubmit}>
        {/* Title */}
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        /><br />

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
        /><br />

        {/* License Number */}
        <label htmlFor="licenseNumber">License Number:</label>
        <input
          type="text"
          id="licenseNumber"
          value={licenseNumber}
          onChange={(e) => setLicenseNumber(e.target.value)}
          required
        /><br />

        {/* hospitalAffiliaton */}
        <label htmlFor="hospitalAffiliaton">Hospital Affiliation:</label>
        <input
          type="text"
          id="hospitalAffiliaton"
          value={hospitalAffiliation}
          onChange={(e) => setHospitalAffiliation(e.target.value)}
          required
        /><br />

        {/* Qualifications */}
        <div className="form-group">
          <label>Qualifications : </label>
          <MultipleValueField items={qualifications} setItems={setQualifications} />
        </div>

        {/* Specialities */}
        <div className="form-group">
          <label>Specializations : </label>
          <MultipleValueField items={specialities} setItems={setSpecialities} />
        </div>

        {/* Services */}
        <div className="form-group">
          <label>Services: </label>
          <MultipleValueField items={services} setItems={setServices} />
        </div>

        {/* About */}
        <label htmlFor="about">About:</label>
        <textarea
          type="text"
          id="about"
          value={about}
          name="about"
          rows="8"
          cols="50"
          placeholder='Write a little about yourself'
          onChange={(e) => setAbout(e.target.value)}>
          </textarea><br />

        {/* Submit Button */}
        <button type="submit">Register Doctor</button>
      </form>
    </div>
  );
}

export default DoctorRegistrationForm;