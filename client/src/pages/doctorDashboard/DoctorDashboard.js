import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AiFillSchedule, AiOutlineLogout } from 'react-icons/ai';
import { BiSolidMessageAlt } from 'react-icons/bi'
import { BsFillCaretRightFill, BsFillPeopleFill, BsFillCalendar2DayFill } from "react-icons/bs";
import './DoctorDashboard.css';
import AppointmentList from './AppointmentList';
import ChatComponent from '../chat/ChatComponent';
import DoctorEditProfileForm from './DoctorEditProfile';
import DoctorProfile from './DoctorProfile';
import DoctorAvailabilityForm from '../doctorAvailability/DoctorAvailabilityForm';
import newRequest from '../../utils/newRequest';

const DoctorDashboard = () => {

    const [selectedOption, setSelectedOption] = useState('Dashboard');
    const [doctor, setDoctor] = useState({});
    const [showEditProfile, setShowEditProfile] = useState(false);
    const [expanded, setExpanded] = useState(false);
    const navigate = useNavigate();

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

    // expand and collapse the sidebar. Expand shows both icons and labels
    // collapse shows only labels
    const toggleSidebar = () => {
        setExpanded(!expanded);
    };

    const handleOptionClick = (option) => {
        // set the selected option to the sidebar menu item clicked
        setSelectedOption(option);
    }

    // got to EditProfile
    const handleEditProfileClick = () => {
        setShowEditProfile(true);
    };

    // got back to DoctorProfile from the EditProfile
    const handleGoBack = () => {
        setShowEditProfile(false);
    }

    const handleLogOut = async () => {
        // remove the user object and the cookie from the browser
        try {
            await newRequest.post('/auth/logout');
            localStorage.setItem("currentUser", null);
            navigate('/');
        } catch (error) {
            console.log(error);
        }
    }

    // to handle sidebar menu Items
    const contentMap = {
        Availability: <DoctorAvailabilityForm doctorId={doctor._id} />,
        Profile: showEditProfile ? (
            <DoctorEditProfileForm doctor={doctor} goBack={handleGoBack} />
        ) : (
            <DoctorProfile doctor={doctor} onEditProfile={handleEditProfileClick} />
        ),
        Appointment: <AppointmentList doctorId={doctor._id} />,
        Chat: <ChatComponent userType="doctor" userId={doctor._id} />
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


                    <div
                        className={`menu-item ${selectedOption === 'Chat' ? 'active' : ''}`}
                        title='Chat'
                        onClick={() => handleOptionClick('Chat')}>
                        <BiSolidMessageAlt className='menu-icon' />
                        <span className="menu-label">Chat</span>
                    </div>

                    <div
                        className={`menu-item ${selectedOption === 'Logout' ? 'active' : ''}`}
                        title='Logout'
                        onClick={() => handleLogOut()}
                    >
                        <AiOutlineLogout className='menu-icon' />
                        <span className="menu-label">Logout</span>
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

export default DoctorDashboard;