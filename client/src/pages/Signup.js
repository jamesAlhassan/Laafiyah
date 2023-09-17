import { useState } from "react";
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
        <form>
          <div class='form_wrap'>
            <div class='input_grp'>
              <div class='input_wrap'>
                <label for='fname'>First Name</label>
                <input type='text' id='fname' required />
              </div>
              <div class='input_wrap'>
                <label for='lname'>Last Name</label>
                <input type='text' id='lname' required />
              </div>
            </div>
            <div class='input_wrap'>
              <label for='email'>Email Address</label>
              <input type='text' id='email' required />
            </div>
            <div class='input_wrap'>
              <label>Gender</label>
              <ul>
                <li>
                  <label class='radio_wrap'>
                    <input
                      type='radio'
                      name='gender'
                      value='male'
                      class='input_radio'
                      checked
                    />
                    <span>Male</span>
                  </label>
                </li>
                <li>
                  <label class='radio_wrap'>
                    <input
                      type='radio'
                      name='gender'
                      value='female'
                      class='input_radio'
                    />
                    <span>Female</span>
                  </label>
                </li>
              </ul>
            </div>
            <div class='input_wrap'>
              <label for='dob'>DOB</label>
              <input type='date' id='dob' required />
            </div>
            <div class='input_wrap'>
              <label for='hospital'>hospital</label>
              <input type='text' id='hospital' />
            </div>
            <div class='input_wrap'>
              <label for='license'>license #</label>
              <input type='text' id='license' />
            </div>
            <div class='input_wrap'>
              <input type='submit' value='Register Now' class='submit_btn' />
            </div>
          </div>
        </form>
      ) : (
        <form>
          <div class='form_wrap'>
            <div class='input_grp'>
              <div class='input_wrap'>
                <label for='fname'>First Name</label>
                <input type='text' id='fname' required />
              </div>
              <div class='input_wrap'>
                <label for='lname'>Last Name</label>
                <input type='text' id='lname' required />
              </div>
            </div>
            <div class='input_wrap'>
              <label for='email'>Email Address</label>
              <input type='text' id='email' required />
            </div>
            <div class='input_wrap'>
              <label>Gender</label>
              <ul>
                <li>
                  <label class='radio_wrap'>
                    <input
                      type='radio'
                      name='gender'
                      value='male'
                      class='input_radio'
                      checked
                    />
                    <span>Male</span>
                  </label>
                </li>
                <li>
                  <label class='radio_wrap'>
                    <input
                      type='radio'
                      name='gender'
                      value='female'
                      class='input_radio'
                    />
                    <span>Female</span>
                  </label>
                </li>
              </ul>
            </div>
            <div class='input_wrap'>
              <label for='dob'>DOB</label>
              <input type='date' id='dob' required />
            </div>
            <div class='input_wrap'>
              <label for='other'>Other</label>
              <input type='text' id='other' />
            </div>
            <div class='input_wrap'>
              <input type='submit' value='Register Now' class='submit_btn' />
            </div>
          </div>
        </form>
      )}
    </div>
  );
};
export default Signup;
