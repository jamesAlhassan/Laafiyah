import React, { useEffect, useState } from 'react';
import './DoctorDashboard.css';
import AppointmentList from './AppointmentList';
import DoctorAvailabilityForm from '../doctorAvailability/DoctorAvailabilityForm';
import DoctorProfile from './DoctorProfile';
import newRequest from '../../utils/newRequest';
import DoctorEditProfileForm from './DoctorEditProfile';
import { BsFillCaretRightFill, BsFillPeopleFill, BsFillCalendar2DayFill } from "react-icons/bs";
import { AiFillSchedule } from 'react-icons/ai';

const NewDashboard = () => {

    const [selectedOption, setSelectedOption] = useState('Dashboard');
    const [doctor, setDoctor] = useState({});
    const [showEditProfile, setShowEditProfile] = useState(false);
    const [expanded, setExpanded] = useState(false);

    const toggleSidebar = () => {
        setExpanded(!expanded);
    };

    useEffect(() => {
        getDoctor();
    }, []);

    // get doctor using the user object in the browser storage
    const getDoctor = async () => {
        try {
            const res = await newRequest.get('/doctor/user')

            const fetchedDoctor = res.data;
            setDoctor(fetchedDoctor);
            console.log("Doctor: ", doctor);

        } catch (error) {
            console.log('Error getting doctor: ', error);
        }
    }

    const handleOptionClick = (option) => {
        setSelectedOption(option);
    }

    // got to EditProfile
    const handleEditProfileClick = () => {
        setShowEditProfile(true);
    };

    // got back to DoctorProfile
    const handleGoBack = () => {
        setShowEditProfile(false);
    }

    const contentMap = {
        Availability: <DoctorAvailabilityForm doctorId={doctor._id} />,
        Profile: showEditProfile ? (
            <DoctorEditProfileForm doctor={doctor} goBack={handleGoBack} />
        ) : (
            <DoctorProfile doctor={doctor} onEditProfile={handleEditProfileClick} />
        ),
        Appointment: <AppointmentList doctorId={doctor._id} />,
        // Dashboard: <DashboardContent />,
        // Profile: <ProfileContent />,
        // Settings: <SettingsContent />,
        // Messages: <MessagesContent />,
    };

    return (
        <div className='dashboard'>
            <div className={`side-bar-container ${expanded ? 'expanded' : ''}`}>
                <div className={`sidebar ${expanded ? 'expanded' : ''}`}>
                    <div className="open-menu" onClick={toggleSidebar}>
                        <BsFillCaretRightFill className='open-menu-icon"' />
                    </div>

                    <div
                        className={`menu-item ${selectedOption === 'Appointment' ? 'active' : ''}`}
                        title='View all appointments'
                        onClick={() => handleOptionClick('Appointment')}
                    >
                        <AiFillSchedule className='menu-icon' />
                        <span className="menu-label">Appointments</span>
                    </div>

                    <div
                        className={`menu-item ${selectedOption === 'Availability' ? 'active' : ''}`}
                        title='View all availabilities'
                        onClick={() => handleOptionClick('Availability')}>
                        <BsFillCalendar2DayFill className='menu-icon' />
                        <span className="menu-label">Availabilities</span>
                    </div>

                    <div 
                    className={`menu-item ${selectedOption === 'Profile' ? 'active' : ''}`}
                        title='Profile'
                        onClick={() => handleOptionClick('Profile')}>
                        <BsFillPeopleFill className='menu-icon' />
                        <span className="menu-label">Profile</span>
                    </div>

                    <div className="menu-item">
                        <BsFillCalendar2DayFill className='menu-icon' />
                        <span className="menu-label">Label 4</span>
                    </div>
                </div>
            </div>
            <main className='main'>
                <h3>Welcome {doctor.title} {doctor.firstName} {doctor.lastName}</h3>
                {contentMap[selectedOption]}
            </main>
        </div>
    );
};

export default NewDashboard;