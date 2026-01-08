import React, { useEffect, useState } from "react";
import api from "./api";
import "./DeleteBooking.css";

const DeleteBooking = () => {
  const [bookings, setBookings] = useState([]);
  const [selectedBookingId, setSelectedBookingId] = useState("");
  const [message, setMessage] = useState("");

  const isPRO = localStorage.getItem("isPRO") === "true";

  useEffect(() => {
    if (isPRO) {
      fetchBookings();
    }
  }, [isPRO]);

  const fetchBookings = async () => {
    try {
      const res = await api.get("/api/bookings/");
      setBookings(res.data);
    } catch (err) {
      console.error("Error fetching bookings", err);
    }
  };

  const handleDelete = async () => {
    if (!selectedBookingId) return;
    try {
      await api.delete(`/api/bookings/${selectedBookingId}/`);
      setMessage("Booking deleted successfully.");
      setSelectedBookingId("");
      fetchBookings();
    } catch (err) {
      setMessage("Failed to delete booking.");
    }
  };

  if (!isPRO) {
    return <p className="access-denied">⛔ Access denied. Only PRO can delete bookings.</p>;
  }

  return (
    <div className="delete-booking-container">
      <h2>Delete Booking</h2>

      <select
        value={selectedBookingId}
        onChange={(e) => setSelectedBookingId(e.target.value)}
        className="booking-dropdown"
      >
        <option value="">-- Select Booking --</option>
        {bookings.map((b) => (
          <option key={b.booking_id} value={b.booking_id}>
            {`${b.booking_id} | ${b.event_name} (${b.date} - ${b.slot})`}
          </option>
        ))}
      </select>

      <button onClick={handleDelete} disabled={!selectedBookingId}>
        Delete
      </button>

      {message && <p className="delete-message">{message}</p>}
    </div>
  );
};

export default DeleteBooking;
