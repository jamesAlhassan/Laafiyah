import React from "react";
import { Link } from "react-router-dom";

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
    </div>
  );
};
export default Home;
