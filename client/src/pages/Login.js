import { useState } from "react";
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
    <div>
      <button className='btn' onClick={handleDocLogin}>
        {docLogin ? "as a patient" : "as a doctor"}
      </button>
      {/* DOCTOR FORM */}
      {docLogin ? (
        <form className='form' onSubmit={handleSubmit}>
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
          {/* hospital */}
          <div className='form-row'>
            <label htmlFor='hospital' className='form-label'>
              Hospital
            </label>
            <input
              type='hospital'
              className='form-input'
              id='hospital'
              name='hospital'
              value={user.hospital}
              onChange={handleChange}
            />
          </div>
          {/* license no. */}
          <div className='form-row'>
            <label htmlFor='license' className='form-label'>
              License
            </label>
            <input
              type='license'
              className='form-input'
              id='license'
              name='license'
              value={user.license}
              onChange={handleChange}
            />
          </div>
          <button type='submit' className='btn btn-block'>
            submit
          </button>
        </form>
      ) : (
        <form className='form' onSubmit={handleSubmit}>
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
      <div className='form user_unregistered'>
        <div>
          <h2>Don't have an account?</h2>
          <button className='btn'>Sign up</button>
        </div>
      </div>
    </div>
  );
};
export default Login;
