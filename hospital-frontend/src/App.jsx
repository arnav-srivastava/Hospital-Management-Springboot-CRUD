import React, { useState } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import Patients from "./components/Patients";
import Doctors from "./components/Doctors";
import Navbar from "./components/NavBar";
import Login from "./components/Login";
import Signup from "./components/Signup";
import "./index.css";

export default function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken(null);
    navigate("/signin");
  };

  if (!token) {
    return (
      <Routes>
        <Route
          path="/signin"
          element={<Login setToken={setToken} onSignupClick={() => navigate("/signup")} />}
        />
        <Route
          path="/signup"
          element={<Signup onSignupSuccess={() => navigate("/signin")} />}
        />
        <Route path="*" element={<Navigate to="/signin" />} />
      </Routes>
    );
  }

  return (
    <div className="app-container">
      <Navbar onLogout={handleLogout} />
      <div className="page-content">
        <Routes>
          <Route path="/patients" element={<Patients />} />
          <Route path="/doctors" element={<Doctors />} />
          <Route path="/appointments" element={<div className="coming-soon">Appointments Coming Soon...</div>} />
          <Route path="*" element={<Navigate to="/patients" />} />
        </Routes>
      </div>
    </div>
  );
}
