import { useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import newRequest from "../utils/newRequest";

const Login = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  // const [docLogin, setDocLogin] = useState(false);
  const handleChange = (e) => {
    console.log(e.target.name);
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
          if (res.data.user.role === 'doctor') {
            navigate('/dashboard')
          } else if (res.data.user.role === 'patient') {
            navigate('/dashboard');
          }
        })
        .catch((err) => {
          console.log(err);
        })

    } catch (err) {
      console.log(err);
    }
  };


  return (
    <div className='form'>
      <form onSubmit={handleSubmit}>
        <h4>Laafiyah Login</h4>
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
