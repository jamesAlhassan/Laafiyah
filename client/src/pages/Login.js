import { useState } from "react";
import { NavLink } from "react-router-dom";
const Login = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    hospital: "",
    license: "",
  });
  const [docLogin, setDocLogin] = useState(false);
  const handleChange = (e) => {
    console.log(e.target.name);
    setUser({ ...user, [e.target.name]: e.target.value });
  };
  const handleDocLogin = () => {
    setDocLogin((current) => !current);
  };
  const handleSubmit = () => {};
  return (
    <div className='form'>
      <button
        className='btn'
        style={{ marginBottom: 35 }}
        onClick={handleDocLogin}
      >
        {docLogin ? "login as a patient" : "login as a doctor"}
      </button>
      {/* DOCTOR FORM */}
      {docLogin ? (
        <form onSubmit={handleSubmit}>
          <h4>Laafiyah Login</h4>
          {/* name */}
          <div className='form-row'>
            <label htmlFor='name' className='form-label'>
              name
            </label>
            <input
              type='text'
              className='form-input'
              id='name'
              name='name'
              value={user.name}
              onChange={handleChange}
            />
          </div>
          {/* email */}
          <div className='form-row'>
            <label htmlFor='email' className='form-label'>
              Email
            </label>
            <input
              type='email'
              className='form-input'
              id='email'
              name='email'
              value={user.email}
              onChange={handleChange}
            />
          </div>
          {/* email */}
          <div className='form-row'>
            <label htmlFor='password' className='form-label'>
              Password
            </label>
            <input
              type='password'
              className='form-input'
              id='password'
              name='password'
              value={user.password}
              onChange={handleChange}
            />
          </div>

          <button type='submit' className='btn btn-block'>
            submit
          </button>
        </form>
      ) : (
        <form onSubmit={handleSubmit}>
          <h4>Laafiyah Login</h4>
          {/* name */}
          <div className='form-row'>
            <label htmlFor='name' className='form-label'>
              name
            </label>
            <input
              type='text'
              className='form-input'
              id='name'
              name='name'
              value={user.name}
              onChange={handleChange}
            />
          </div>
          {/* email */}
          <div className='form-row'>
            <label htmlFor='email' className='form-label'>
              Email
            </label>
            <input
              type='email'
              className='form-input'
              id='email'
              name='email'
              value={user.email}
              onChange={handleChange}
            />
          </div>
          {/* email */}
          <div className='form-row'>
            <label htmlFor='password' className='form-label'>
              Password
            </label>
            <input
              type='password'
              className='form-input'
              id='password'
              name='password'
              value={user.password}
              onChange={handleChange}
            />
          </div>

          <button type='submit' className='btn btn-block'>
            submit
          </button>
        </form>
      )}
      {/* PATIENT FORM */}
      <div className=' user_unregistered'>
        <div>
          <h2>Don't have an account?</h2>
          <button className='btn'>
            <NavLink to='/signup'>Sign Up</NavLink>
          </button>
        </div>
      </div>
    </div>
  );
};
export default Login;
