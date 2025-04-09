import React from "react";
import { useNavigate } from "react-router-dom";
import "./Welcome.css";

const Welcome = () => {
  const navigate = useNavigate();

  const handleStart = () => {
    navigate("/login");
  };

  return (
    <div className="welcome-page no-border">
      <div className="welcome-content">
        <h1 className="welcome-title">Welcome to Auditorium Booking</h1>
        <p className="welcome-subtitle">
          Book your college auditorium for symposiums, conferences, and events.
        </p>
        <button className="start-button" onClick={handleStart}>
          Get Started
        </button>
      </div>
    </div>
  );
};

export default Welcome;
