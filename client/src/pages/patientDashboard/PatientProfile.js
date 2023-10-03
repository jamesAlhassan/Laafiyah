import React, { } from "react";
import profile_pic from "../../assets/profile_pic.jpeg";

const PatientProfile = ({ patient, onEditProfile }) => {

    return (
        <div className="doctor-profile-form">
            <h2>Patient Profile</h2>
            <div className='info'>
                <div className='left-side'>
                    <div className="profile-pic">
                        <img src={profile_pic} />
                    </div>
                </div>

                <div className="right-side">
                    <div className="form-group">
                        <label>First Name:</label>
                        <span>{patient.firstName}</span>
                    </div>

                    <div className="form-group">
                        <label>Last Name:</label>
                        <span>{patient.lastName}</span>
                    </div>

                    <div className="form-group">
                        <label>Date of Birth:</label>
                        <span>{patient.dateOfBirth ? patient.dateOfBirth.substr(0, 10) : ''}</span>
                    </div>

                    <div className="form-group">
                        <label>Gender:</label>
                        <span>{patient.gender}</span>
                    </div>

                    <div className="form-group">
                        <label>Phone Number:</label>
                        <span>{patient.phoneNumber}</span>
                    </div>

                    <div className="form-group">
                        <label>Location:</label>
                        <span>{patient.location}</span>
                    </div>
                </div>
            </div>

            <button onClick={onEditProfile}>Edit Profile</button>
        </div>
    );
};

export default PatientProfile;
