import React, { useState, useEffect, useRef } from "react";
import '../doctorDashboard/DoctorEditProfile.css';
import newRequest from '../../utils/newRequest';
import { useNavigate } from 'react-router-dom';
import profile_pic from "../../assets/profile_pic.jpeg";
import uploadImage from "../../assets/uploadImage.png";

const PatientEditProfile = ({ patient, goBack }) => {

    const [dateOfBirth, setDateOfBirth] = useState(null);
    const [formData, setFormData] = useState(patient);
    const [imagePreview, setImagePreview] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [proImage, setProImage] = useState(profile_pic);
    const [profileImage, setProfileImage] = useState("");
    const hiddenFileInput = useRef(null);

    const navigate = useNavigate();

    let imgUrl;
    const handleUploadButtonClick = async (e) => {
        // add imaage to cloudinary and get the url
        e.preventDefault();
        setIsLoading(true);
        const formData1 = new FormData(e.currentTarget);

        try {
            if (
                profileImage &&
                (profileImage.type === "image/png" ||
                    profileImage.type === "image/jpeg" ||
                    profileImage.type === "image/jpg")
            ) {
                const formData = new FormData();
                formData.append("file", profileImage);
                formData.append("cloud_name", "dryweqcbf");
                formData.append("upload_preset", process.env.REACT_APP_UPLOAD_PRESET);

                const res = await fetch(
                    "https://api.cloudinary.com/v1_1/dryweqcbf/image/upload",
                    {
                        method: "post",
                        body: formData,
                    }
                );

                const data = await res.json();
                imgUrl = data.url.toString();
                setImagePreview(null);
                setProImage(imgUrl);
            }
            alert(imgUrl);
            e.currentTarget.reset();
            setIsLoading(false);
        } catch (err) {
            console.log(err);
            setIsLoading(false);
        }
    };

    const handleChange = (e) => {
        setProfileImage(e.target.files[0]);
        setImagePreview(URL.createObjectURL(e.target.files[0]));
    };

    const handleClick = (event) => {
        hiddenFileInput.current.click();
    };


    useEffect(() => {
        // parse the date string from MongoDB into a Date object
        const dateOfBirthFromMongo = new Date(patient.dateOfBirth);
        setDateOfBirth(dateOfBirthFromMongo);
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
            // Make a PUT or PATCH request to update the patient's profile data
            await newRequest.put('/patient/profile', formData); // Adjust the endpoint
            console.log('Patient profile updated successfully');
            navigate('/dashboard'); // Redirect to the dashboard or profile view
        } catch (error) {
            console.error('Error updating patient profile:', error);
        }
    };
    return (
        <div className="doctor-profile-form">
            <h1>Edit Profile</h1>
            <form onSubmit={handleUpdateProfile}>
                <div className='info'>
                    <div className='left-side'>
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


                    </div>

                    <div className='right-side'>
                        <div className='image-upload-container'>
                            <div className='box-decoration'>
                                <label
                                    htmlFor='image-upload-input'
                                    className='image-upload-label'
                                >
                                    {imagePreview ? (
                                        imagePreview.name
                                    ) : (
                                        <div>
                                            <img
                                                src={uploadImage}
                                                alt='upload image'
                                                className='img-display-before'
                                            />
                                            <p>Choose an image</p>
                                        </div>
                                    )}
                                </label>
                                <div
                                    onClick={handleClick}
                                    style={{ cursor: "pointer" }}
                                >
                                    {imagePreview && (
                                        <img src={imagePreview && imagePreview} />
                                    )}

                                    <input
                                        id='image-upload-input'
                                        type='file'
                                        accept='image/png, image/jpeg, image/jpg'
                                        onChange={handleChange}
                                        ref={hiddenFileInput}
                                        style={{ display: "none" }}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='bottom'>
                    <button type="submit">Update Profile</button>
                    <button onClick={goBack}>Go Back</button>
                </div>
            </form>
        </div>
    );
}

export default PatientEditProfile;