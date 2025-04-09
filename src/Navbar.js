import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem("isPRO") === "true";

  const handleLogout = () => {
    localStorage.removeItem("isPRO");
    navigate("/login"); // redirect after logout
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/">🎓 Auditorium</Link>
      </div>

      <ul className="navbar-links">
        <li><Link to="/booking">View Calendar</Link></li>
        <li><Link to="/add-booking">Add Booking</Link></li>
        <li><Link to="/update-booking">Update Booking</Link></li>
        <li><Link to="/delete-booking">Delete Booking</Link></li>

        {isLoggedIn ? (
          <>
            <li><Link to="/pro-dashboard">PRO</Link></li>
            <li><Link to="/" onClick={handleLogout}>Logout</Link></li>
          </>
        ) : (
          <li><Link to="/login">Login</Link></li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
