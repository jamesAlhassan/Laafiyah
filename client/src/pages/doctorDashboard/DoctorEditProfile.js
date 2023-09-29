import React, { useState, useEffect } from 'react';
import './DoctorEditProfile.css';
import newRequest from '../../utils/newRequest';
import { useNavigate } from 'react-router-dom';
import MultipleValueFieldData from '../../components/multipleValueField/MultipleValueFieldData';

function DoctorEditProfileForm() {
    const [dateOfBirth, setDateOfBirth] = useState(null);
    const [formData, setFormData] = useState({
        title: 'Dr.',
        firstName: 'Alhassan',
        lastName: 'Abukari',
        dateOfBirth: '012-12-13T00:00:00.000Z',
        gender: 'male',
        phoneNumber: '+2222 225 25 2 5',
        location: 'Adenta',
        licenseNumber: '021566',
        hospitalAffiliation: '37 Military Hospital',
        about: 'I am a soldier and I am very strong but I am also very quiet and I dont tolerate nonsense',
        specialities: [
            "Qui",
            "quia",
            "quisquam",
            "do"
        ],
        services: [
            "Quae omnis et beatae",
            "Quae omnis et beatae",
            "Quae omnis et beatae",
            "Quae omnis et beatae"
        ],
        qualifications: [
            "Adipisicing",
            "consecte"
        ],
    });

    const navigate = useNavigate();

    useEffect(() => {
        // Fetch the doctor's existing profile data from the backend
        const fetchDoctorProfile = async () => {
            try {
                const response = await newRequest.get('/doctor/profile'); // Adjust the endpoint
                const doctorData = response.data;

                // parse the date string from MongoDB into a Date object
                const dateOfBirthFromMongo = new Date(doctorData.dateOfBirth);
                setDateOfBirth(dateOfBirthFromMongo);

                setFormData(doctorData); // Populate the form with doctor's data
            } catch (error) {
                console.error('Error fetching doctor profile:', error);
            }
        };

        fetchDoctorProfile();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleUpdateProfile = async (e) => {
        e.preventDefault();

        try {
            // Make a PUT or PATCH request to update the doctor's profile data
            await newRequest.put('/doctor/profile', formData); // Adjust the endpoint
            console.log('Doctor profile updated successfully');
            navigate('/dashboard'); // Redirect to the dashboard or profile view
        } catch (error) {
            console.error('Error updating doctor profile:', error);
        }
    };

    return (
        <div className="doctor-profile-form">
            <h2>Edit Doctor Profile</h2>
            <form onSubmit={handleUpdateProfile}>
                <div className='info'>
                    <div className='left-side'>
                        <div className="form-group">
                            <label>Title:</label>
                            <input
                                type="text"
                                name="title"
                                value={formData.title}
                                onChange={handleInputChange}
                            />
                        </div>

                        <div className="form-group">
                            <label>First Name:</label>
                            <input
                                type="text"
                                name="firstName"
                                value={formData.firstName}
                                onChange={handleInputChange}
                            />
                        </div>

                        <div className="form-group">
                            <label>Last Name:</label>
                            <input
                                type="text"
                                name="lastName"
                                value={formData.lastName}
                                onChange={handleInputChange}
                            />
                        </div>

                        <div className="form-group">
                            <label>Date of Birth:</label>
                            <input
                                type="date"
                                name="dateOfBirth"
                                value={dateOfBirth ? dateOfBirth.toISOString().substr(0, 10) : ''}
                                onChange={handleInputChange}
                            />
                        </div>

                        <div className="form-group">
                            <label>Gender:</label>
                            <select
                                name="gender"
                                value={formData.gender}
                                onChange={handleInputChange}
                            >
                                <option value="">Select Gender</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                            </select>
                        </div>

                        <div className="form-group">
                            <label>Phone Number:</label>
                            <input
                                type="tel"
                                name="phoneNumber"
                                value={formData.phoneNumber}
                                onChange={handleInputChange}
                            />
                        </div>

                        <div className="form-group">
                            <label>Location:</label>
                            <input
                                type="text"
                                name="location"
                                value={formData.location}
                                onChange={handleInputChange}
                            />
                        </div>

                        <div className="form-group">
                            <label>About:</label>
                            <textarea
                                name="about"
                                rows="8"
                                cols="50"
                                value={formData.about}
                                onChange={handleInputChange}
                            ></textarea>
                        </div>
                    </div>

                    <div className='right-side'>
                        <div className="form-group">
                            <label>License Number:</label>
                            <input
                                type="text"
                                name="licenseNumber"
                                value={formData.licenseNumber}
                                onChange={handleInputChange}
                            />
                        </div>

                        <div className="form-group">
                            <label>Hospital Affiliation:</label>
                            <input
                                type="text"
                                name="hospitalAffiliation"
                                value={formData.hospitalAffiliation}
                                onChange={handleInputChange}
                            />
                        </div>

                        <div className="form-group">
                            <label>Qualifications:</label>
                            <MultipleValueFieldData name="Qualification" values={formData.qualifications} setValues={(values) => setFormData({ ...formData, qualifications: values })} />
                        </div>

                        <div className="form-group">
                            <label>Specializations:</label>
                            <MultipleValueFieldData name="Specialization" values={formData.specialities} setValues={(values) => setFormData({ ...formData, specialities: values })} />
                        </div>

                        <div className="form-group">
                            <label>Services:</label>
                            <MultipleValueFieldData name="Service" values={formData.services} setValues={(values) => setFormData({ ...formData, services: values })} />
                        </div>
                    </div>
                </div>

                <button type="submit">Update Profile</button>
            </form>
        </div>
    );
}

export default DoctorEditProfileForm;
