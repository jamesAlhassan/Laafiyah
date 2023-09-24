import React from "react";
import { Link } from "react-router-dom";
import { AiFillPlusCircle } from "react-icons/ai";
import { FaFolder } from "react-icons/fa";
import { BsFillPeopleFill, BsFillCalendar2DayFill } from "react-icons/bs";
import profile_pic from "../../assets/profile_pic.jpeg";
const Dashboard = () => {
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
          <li title='View all appointments'>
            <Link to='/'>
              <FaFolder />
            </Link>
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
      <main className='main'></main>
    </div>
  );
};
export default Dashboard;
