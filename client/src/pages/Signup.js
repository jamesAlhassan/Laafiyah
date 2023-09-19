import { useState } from "react";
import DoctorRegistrationForm from "../components/signup/DoctorSignup";
import PatientRegistrationForm from "../components/signup/PatientSignup";
const Signup = () => {
  const [docSignup, setDocSignup] = useState(false);
  const handleDocSignup = () => {
    setDocSignup((current) => !current);
  };
  return (
    <div className='form'>
      <button className='btn' onClick={handleDocSignup}>
        {docSignup ? "signup as a patient" : "signup as a doctor"}
      </button>
      {docSignup ? (
        <DoctorRegistrationForm />
      ) : (
       <PatientRegistrationForm />
      )}
    </div>
  );
};
export default Signup;
