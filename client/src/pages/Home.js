import React from "react";
import { Link } from "react-router-dom";
import { AiFillPlusCircle } from "react-icons/ai";
import { FaColumns, FaFolder } from "react-icons/fa";
import { BsFillPeopleFill, BsFillCalendar2DayFill } from "react-icons/bs";
import profile_pic from "../assets/profile_pic.jpeg";
const Home = () => {
  return (
    <div class='wrapper'>
      <header class='header'>
        <a href='#' class='btn-appointment'>
          Make an appointment
        </a>
        <div class='profile'>
          <div class='image'>
            <img src={profile_pic} />
            <div class='notification'></div>
          </div>

          <select>
            <option value='John Doe'>John Doe</option>
          </select>
        </div>
      </header>
      <aside class='aside'>
        <ul>
          <li class='logo hide'>
            <AiFillPlusCircle />
          </li>
          <li class='active'>
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
          <li>
            <Link to='/'>
              <BsFillPeopleFill />
            </Link>
          </li>
          <li class='hide'>
            <Link to='/'>
              <BsFillCalendar2DayFill />
            </Link>
          </li>
        </ul>
      </aside>
    </div>
  );
};
export default Home;
