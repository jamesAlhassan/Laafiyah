import React, { useEffect, useState } from 'react';
import AppointmentList from './AppointmentList';
import './DoctorDashboard.css';
import { AiFillPlusCircle } from "react-icons/ai";
import { FaFolder } from "react-icons/fa";
import { BsFillPeopleFill, BsFillCalendar2DayFill } from "react-icons/bs";
import DoctorAvailabilityForm from '../doctorAvailability/DoctorAvailabilityForm';
import { useParams } from "react-router-dom";
import DoctorProfile from './DoctorProfile';
import newRequest from '../../utils/newRequest';

const DoctorDashboard = () => {
    // get doctorId
    const { doctorId } = useParams();
    const [selectedOption, setSelectedOption] = useState('Dashboard');
    const [doctor, setDoctor] = useState({});

    useEffect(() => {
        getDoctor();
        console.log(doctor)

    }, []);

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

    const contentMap = {
        Availability: <DoctorAvailabilityForm doctorId={doctor._id} />,
        Profile: <DoctorProfile doctor={doctor} />,
        Appointment: <AppointmentList doctorId={doctor._id} />,
        // Dashboard: <DashboardContent />,
        // Profile: <ProfileContent />,
        // Settings: <SettingsContent />,
        // Messages: <MessagesContent />,
    };

    return (
        <div className='wrapper'>
            <aside className='aside'>
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
                <h3>Welcome {doctor.firstName} {doctor.lastName}</h3>
                {contentMap[selectedOption]}
            </main>
        </div>
    );
}

export default DoctorDashboard;
