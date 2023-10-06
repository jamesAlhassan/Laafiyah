import React, { useState, useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { AiFillSchedule, AiOutlineLogout } from 'react-icons/ai';
import { BiSolidMessageAlt } from 'react-icons/bi';
import { BsFillCaretRightFill, BsFillPeopleFill } from "react-icons/bs";
import './PatientDashboard.css';
import PatientAppointments from "./PatientAppointments";
import PatientEditProfile from "./PatientEditProfile";
import PatientProfile from "./PatientProfile";
import ChatComponent from "../chat/ChatComponent";
import newRequest from '../../utils/newRequest';
import profile_pic from "../../assets/profile_pic.jpeg";

const PatientDashboard = () => {

  const [selectedOption, setSelectedOption] = useState('Dashboard');
  const [patient, setPatient] = useState({});
  const [showEditProfile, setShowEditProfile] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [proImage, setProImage] = useState(profile_pic);
  const navigate = useNavigate();

  useEffect(() => {
    getPatient();
  }, []);

  // get patient using the user object in the browser storage
  const getPatient = async () => {
    try {
      const res = await newRequest.get('/patient/user')

      const fetchedPatient = res.data;
      setPatient(fetchedPatient);
      console.log("patient: ", patient);

    } catch (error) {
      console.log('Error getting patient: ', error);
    }
  }

  // expand and collapse the side bar. Collapse shows only icons
  // expand shows both icons and labels
  const toggleSidebar = () => {
    setExpanded(!expanded);
  };

  // got to EditProfile
  const handleEditProfileClick = () => {
    setShowEditProfile(true);
  };

  const handleOptionClick = (option) => {
    // set the selected option to switch between pages/components
    setSelectedOption(option);
  }

  // got back to PatientProfile
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

  // to handle the sidebar menu Items
  const contentMap = {
    Appointment: <PatientAppointments patientId={patient._id} />,
    Profile: showEditProfile ? (
      <PatientEditProfile patient={patient} goBack={handleGoBack} />
    ) : (
      <PatientProfile patient={patient} onEditProfile={handleEditProfileClick} />),
    Chat: <ChatComponent userType="patient" userId={patient._id} />,
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
        <header className='header'>
          <h3>Welcome {patient.firstName} {patient.lastName}</h3>
          <Link to='/alldoctors' className='btn-appointment'>
            Make an appointment
          </Link>
          <div className='profile'>
            <div className='image'>
              <img className="pro-img" src={proImage} />
            </div>
          </div>
        </header>
        {contentMap[selectedOption]}
      </main>
    </div>
  );
};

export default PatientDashboard;