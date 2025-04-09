// App.js
import React from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import BookingApp from "./BookingApp";
import AddBooking from "./AddBooking";
import UpdateBooking from "./UpdateBooking";
import DeleteBooking from "./DeleteBooking";
import Navbar from "./Navbar";
import Login from "./Login";
import ProDashboard from "./ProDashboard";
import Welcome from "./Welcome";

const App = () => {
  const location = useLocation();
  const isPRO = localStorage.getItem("isPRO") === "true";

  const ProtectedPRO = ({ children }) => {
    if (!isPRO) {
      alert("Access Denied. You are not authorized to view this page.");
      return <Navigate to="/booking" replace />;
    }
    return children;
  };

  return (
    <>
      {/* Show Navbar on all pages except Welcome */}
      {location.pathname !== "/" && <Navbar />}
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/login" element={<Login />} />
        <Route path="/booking" element={<BookingApp />} />
        <Route path="/add-booking" element={<AddBooking />} />
        <Route path="/update-booking" element={<UpdateBooking />} />
        <Route path="/delete-booking" element={<DeleteBooking />} />
        <Route
          path="/pro-dashboard"
          element={
            <ProtectedPRO>
              <ProDashboard />
            </ProtectedPRO>
          }
        />
      </Routes>
    </>
  );
};

export default App;
