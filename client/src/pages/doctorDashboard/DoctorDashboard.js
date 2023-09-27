import React, { useState } from 'react';
import AppointmentList from './AppointmentList';
import './DoctorDashboard.css';
import { AiFillPlusCircle } from "react-icons/ai";
import { FaFolder } from "react-icons/fa";
import { BsFillPeopleFill, BsFillCalendar2DayFill } from "react-icons/bs";
import DoctorAvailabilityForm from '../doctorAvailability/DoctorAvailabilityForm';
import DoctorProfile from './DoctorProfile';
import { useParams } from "react-router-dom";

const DoctorDashboard = () => {
    // get doctorId
    const { doctorId } = useParams();
    const [appointments, setAppointments] = useState([]);
    const [selectedOption, setSelectedOption] = useState('Dashboard');

    const appointmentData = [
        { id: 1, patient: 'Patient 1', date: '2023-09-10', time: '10:00 AM' },
        { id: 2, patient: 'Patient 2', date: '2023-09-11', time: '11:30 AM' },
        // Add more appointments
    ];

    const handleOptionClick = (option) => {
        setSelectedOption(option);
    }

    const contentMap = {
        Availability: <DoctorAvailabilityForm doctorId={doctorId} />,
        Profile: <DoctorProfile />,
        Appointment: <AppointmentList doctorId={doctorId} />,
        // Dashboard: <DashboardContent />,
        // Profile: <ProfileContent />,
        // Settings: <SettingsContent />,
        // Messages: <MessagesContent />,
    };

    return (
        <div class='wrapper'>
            <aside class='aside'>
                <ul>
                    <li className='logo hide' title='Add appointment'>
                        <AiFillPlusCircle />
                    </li>
                    <li className={selectedOption === 'Appointment' ? 'active' : ''}
                        title='View all appointments'
                        onClick={() => handleOptionClick('Appointment')}>
                        <FaFolder />
                    </li>

                    <li className={selectedOption === 'Availability' ? 'active' : ''}
                        title='View all availabilities'
                        onClick={() => handleOptionClick('Availability')}>
                        <FaFolder />
                    </li>


                    <li className={selectedOption === 'Profile' ? 'active' : ''}
                        title='Profile'
                        onClick={() => handleOptionClick('Profile')}>
                        <BsFillPeopleFill />
                    </li>

                    <li>
                        <BsFillPeopleFill />
                    </li>
                    <li>
                        <BsFillPeopleFill />
                    </li>
                    <li className='hide'>
                        <BsFillCalendar2DayFill />
                    </li>
                </ul>
            </aside>
            <main className='main'>
                <h3>Welcome Doctor</h3>
                {contentMap[selectedOption]}
            </main>
        </div>
    );
}

export default DoctorDashboard;
