import React, { useState, useEffect } from 'react';
import './DoctorProfile.css';
import newRequest from '../../utils/newRequest';
import { useNavigate } from 'react-router-dom';

function DoctorProfile({ doctor, onEditProfile }) {
    const [dateOfBirth, setDateOfBirth] = useState(null);

    return (
        <div className="doctor-profile-form">
            <h2>Doctor Profile</h2>
            <div className='info'>
                <div className='left-side'>
                    <div className="form-group">
                        <label>Title:</label>
                        <span>{doctor.title}</span>
                    </div>

                    <div className="form-group">
                        <label>First Name:</label>
                        <span>{doctor.firstName}</span>
                    </div>

                    <div className="form-group">
                        <label>Last Name:</label>
                        <span>{doctor.lastName}</span>
                    </div>

                    <div className="form-group">
                        <label>Date of Birth:</label>
                        <span>{dateOfBirth ? dateOfBirth.toISOString().substr(0, 10) : ''}</span>
                    </div>

                    <div className="form-group">
                        <label>Gender:</label>
                        <span>{doctor.gender}</span>
                    </div>

                    <div className="form-group">
                        <label>Phone Number:</label>
                        <span>{doctor.phoneNumber}</span>
                    </div>

                    <div className="form-group">
                        <label>Location:</label>
                        <span>{doctor.location}</span>
                    </div>
                </div>

                <div className='right-side'>
                    <div className="form-group">
                        <label>License Number:</label>
                        <span>{doctor.licenseNumber}</span>
                    </div>

                    <div className="form-group">
                        <label>Qualifications:</label>
                        <p>{doctor.qualifications.join(', ')}</p>
                    </div>

                    <div className="form-group">
                        <label>Specializations:</label>
                        <p>{doctor.specialities.join(', ')}</p>
                    </div>

                    <div className="form-group">
                        <label>Services:</label>
                        <p>{doctor.services.join(', ')}</p>
                    </div>

                    <div className="form-group">
                        <label>About:</label>
                        <span>{doctor.about}</span>
                    </div>
                </div>
            </div>

            <button onClick={onEditProfile}>Edit Profile</button>
        </div>
    );
}

export default DoctorProfile;
