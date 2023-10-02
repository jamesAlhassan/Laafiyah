import { useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import newRequest from "../utils/newRequest";

const Login = () => {
  const [user, setUser] = useState({ email: "", password: "", });
  const [error, setError] = useState(null); // New state for error
  const navigate = useNavigate();

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // login and get token form the backend
      const res = await newRequest.post('/auth/login', { ...user })
        .then((res) => {
          // store the result in the localStorage of browser
          localStorage.setItem("currentUser", JSON.stringify(res.data));
          // go to the corresponding dashboard
          navigate('/');
        })
        .catch((error) => {
          // Handle errors and update the state with the error message
          const errorMessage = error.response?.data?.msg || 'An error occurred';
          setError(errorMessage);
        })

    } catch (err) {
      console.log(err);
    }
  };


  return (
    <div className='form'>
      <form onSubmit={handleSubmit}>
        <h4>Laafiyah Login</h4>
        {/* Render error message if exists */}
        {error && <div className='error'>{error}</div>}
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
