import React from "react";
import { Link } from "react-router-dom";
import { AiFillSchedule } from "react-icons/ai";
import { BsCalendarEventFill, BsInfoSquareFill } from "react-icons/bs";
import { FaUserDoctor, FaLocationDot } from "react-icons/fa6";
import './Home.css';


const Home = () => {
  return (
    <div className='home-container'>
      <section id='one'>
        <div className='home-content'>
          <div className='text-content'>
            <h1 className='white'>
              Providing Special care For <strong>You At Home</strong>
            </h1>
            <h4 className='blackish'>
              We offer special Medical services for special YOUR needs
            </h4>
            <div className='two-button'>
              <Link to='alldoctors'>
                <button style={{ marginRight: "16px" }} className='w-btn'>
                  View Doctors
                </button>
              </Link>
              <button style={{ marginRight: "16px" }} className='t-btn'>
                Make An Appointment
              </button>
            </div>
          </div>
        </div>
      </section>

      <section id="two">
        <div className="features-container">
          <div className="main-title">
            <h2>DISCOVER THE ONLINE APPOINTMENT</h2>
            <h4>A step-by-step guide to build an on-demand appointment for patients</h4>
          </div>
          <div className="features">
            <div className="feature">
              <FaLocationDot className="feature-icon" />
              <h3>FIND A DOCTOR</h3>
              <p>Doctor / Hospital / Specialization to match specific consultation needs.
              </p>
            </div>

            <div className="feature">
              <FaUserDoctor className="feature-icon" />
              <h3>VIEW DOCTOR</h3>
              <p>
                Know your Doctor to book confirmed doctor.
              </p>
            </div>

            <div className="feature">
              <AiFillSchedule className="feature-icon" />
              <h3>BOOK A VISIT</h3>
              <p>Book your time slot with doctor from your comfort zone</p>
            </div>
          </div>
          <button>Find Doctor</button>
        </div>
      </section>

      <section id="three">
        <div className="features-container reverse">
          <div className="main-title">
            <h2>WHY CHOOSE LAAFIYAH</h2>
            <h4>Online Appointment, Phone-in Appointment, Walk-in Appointment with Token</h4>
          </div>
          <div className="features">
            <div className="feature">
              <BsCalendarEventFill className="feature-icon" />
              <h3>Easy Scheduling</h3>
              <p>With <strong>Laafiyah</strong>, scheduling occurs in one well organised platform so the endless
                back and forth communication can be avoided and a streamlined communication is guaranteed.
              </p>
            </div>

            <div className="feature">
              <BsInfoSquareFill className="feature-icon" />
              <h3>Know Your Doctor</h3>
              <p>You are able to know the qualifications and specialities of your doctor
                before booking an appointment. This helps to choose the right doctor for your condition.</p>
            </div>

            <div className="feature">
              <AiFillSchedule className="feature-icon" />
              <h3>Book Confirmed Appointment</h3>
              <p>Avoid endless back and forth communication.
                Confirmed Doctor Appointment first.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
export default Home;
