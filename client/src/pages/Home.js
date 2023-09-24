import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className='home-container'>
      <h1>
        You got the doctor appointment plans, we got the appointment plans.
      </h1>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi incidunt
        eos aut. Corrupti, odit aspernatur sapiente ab amet error, at corporis
        nostrum veniam magnam natus tempora perspiciatis dolore quam enim?
      </p>
      <Link to='login'>Book Appointment</Link>
    </div>
  );
};
export default Home;
