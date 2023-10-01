import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AiFillPlusCircle } from "react-icons/ai";
import { FaFolder } from "react-icons/fa";
import { BsFillPeopleFill, BsFillCalendar2DayFill } from "react-icons/bs";
import profile_pic from "../../assets/profile_pic.jpeg";
import newRequest from "../../utils/newRequest";

const Dashboard = () => {

  const [selectedOption, setSelectedOption] = useState('Dashboard');
  const [patient, setPatient] = useState({});

  useEffect(() => {
    getPatient();
  }, []);

  // get patient using the user object in the browser storage
  const getPatient = async () => {
    try {
      const res = await newRequest.get('/patient/user')

      const fetchedPatient = res.data;
      setPatient(fetchedPatient);
      console.log("Patient: ", patient);

    } catch (error) {
      console.log('Error getting patient: ', error);
    }
  }

  const handleOptionClick = (option) => {
    setSelectedOption(option);
  }

  const contentMap = {
    Appointments: (<div>Appointment ios here</div>)
  }

  return (
    <div class='wrapper'>
      <header class='header'>
        <a href='#' class='btn-appointment'>
          Make an appointment
        </a>

        <div class='profile'>
          <Link to='/'>
            <div class='image'>
              <img src={profile_pic} />
            </div>
          </Link>
          {/* <select>
            <option value='John Doe'>John Doe</option>
            <option value='update'></option>
          </select> */}
        </div>
      </header>
      <aside class='aside'>
        <ul>
          <li class='logo hide' title='Add appointment'>
            <AiFillPlusCircle />
          </li>

          <li className='active' title='View all doctors'>
            <Link to='/'>
              <BsFillPeopleFill />
            </Link>
          </li>
          <li
            className={selectedOption === 'Appointments' ? 'active' : ''}
            title='View all appointments'
            onClick={() => handleOptionClick('Appointments')}>
            <FaFolder />
          </li>
          <li>
            <Link to='/'>
              <BsFillPeopleFill />
            </Link>
          </li>
          <li>
            <Link to='/'>
              <BsFillPeopleFill />
            </Link>
          </li>
          <li className='hide'>
            <Link to='/'>
              <BsFillCalendar2DayFill />
            </Link>
          </li>
        </ul>
      </aside>
      <main className='main'>
        <h3>Welcome {patient.firstName} {patient.lastName}</h3>
        {contentMap[selectedOption]}
      </main>
    </div>
  );
};
export default Dashboard;
