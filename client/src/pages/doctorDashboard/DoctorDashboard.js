import React, { useState, useEffect } from 'react';
import AppointmentList from './AppointmentList';
import AvailabilityList from './AvailabilityList';
import './DoctorDashboard.css';
import { AiFillPlusCircle } from "react-icons/ai";
import { FaFolder } from "react-icons/fa";
import { BsFillPeopleFill, BsFillCalendar2DayFill } from "react-icons/bs";
import DoctorAvailabilityForm from '../doctorAvailability/DoctorAvailabilityForm';

const DoctorDashboard = () => {
    const [appointments, setAppointments] = useState([]);
    const [availability, setAvailability] = useState([]);
    const [selectedOption, setSelectedOption] = useState('Dashboard');

    const appointmentData = [
        { id: 1, patient: 'Patient 1', date: '2023-09-10', time: '10:00 AM' },
        { id: 2, patient: 'Patient 2', date: '2023-09-11', time: '11:30 AM' },
        // Add more appointments
    ];

    const handleAvailabilities = (data) => {
        setAvailability(data);
    }

    const handleOptionClick = (option) => {
        setSelectedOption(option);
    }

    const contentMap = {
        Availability: <DoctorAvailabilityForm />,
        EditAvailability: <DoctorAvailabilityForm
            handleOptionClick={handleOptionClick}
            availabilities={availability} />,
        Appointment: <AppointmentList appointments={appointmentData} />,
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
                        title='View all doctors'
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
