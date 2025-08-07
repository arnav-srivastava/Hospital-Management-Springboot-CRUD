import React from "react";
import { NavLink } from "react-router-dom";
import "../index.css";

export default function Navbar({ onLogout }) {
  return (
    <nav className="navbar">
      <NavLink
        to="/patients"
        className={({ isActive }) => (isActive ? "active" : "")}
      >
        Patients
      </NavLink>
      <NavLink
        to="/doctors"
        className={({ isActive }) => (isActive ? "active" : "")}
      >
        Doctors
      </NavLink>
      <NavLink
        to="/appointments"
        className={({ isActive }) => (isActive ? "active" : "")}
      >
        Appointments
      </NavLink>
      <button className="logout-btn" onClick={onLogout}>Logout</button>
    </nav>
  );
}
