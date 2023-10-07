import React from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import newRequest from "../utils/newRequest";

export default function Header() {
  const activeStyles = {
    fontWeight: "bold",
    textDecoration: "underline",
    color: "#161616",
  };

  // get the current user
  const user = JSON.parse(localStorage.getItem("currentUser"));
  const navigate = useNavigate();

  const handleLogout = async () => {
    // remove the user object and the cookie from the browser
    try {
      await newRequest.post("/auth/logout");
      localStorage.setItem("currentUser", null);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <header>
      <Link className='site-logo' to='/'>
        #Laafiyah
      </Link>
      <nav>
        <NavLink
          to='alldoctors'
          style={({ isActive }) => (isActive ? activeStyles : null)}
        >
          All Doctors
        </NavLink>
        <NavLink
          to='about'
          style={({ isActive }) => (isActive ? activeStyles : null)}
        >
          About
        </NavLink>
        {user ? (
          <>
            <NavLink
              to={
                user?.user.role === "doctor"
                  ? "/doctordashboard"
                  : "/patientdashboard"
              }
              style={({ isActive }) => (isActive ? activeStyles : null)}
            >
              Dashboard
            </NavLink>
            <NavLink to='/' onClick={handleLogout}>
              Logout
            </NavLink>
          </>
        ) : (
          <NavLink
            to='login'
            style={({ isActive }) => (isActive ? activeStyles : null)}
          >
            Login
          </NavLink>
        )}
      </nav>
    </header>
  );
}
