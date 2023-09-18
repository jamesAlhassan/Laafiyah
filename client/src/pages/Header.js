import React from "react";
import { Link, NavLink } from "react-router-dom";

export default function Header() {
  const activeStyles = {
    fontWeight: "bold",
    textDecoration: "underline",
    color: "#161616",
  };

  return (
    <header>
      <Link className='site-logo' to='/'>
        #Laafiyah
      </Link>
      <nav>
        <NavLink
          to='alldoctors'
          style={({ isActive }) => (isActive ? activeStyles : null)}>
          All Doctors
        </NavLink>
        <NavLink
          to='about'
          style={({ isActive }) => (isActive ? activeStyles : null)}
        >
          About
        </NavLink>
        <NavLink
          to='login'
          style={({ isActive }) => (isActive ? activeStyles : null)}
        >
          login
        </NavLink>
      </nav>
    </header>
  );
}
