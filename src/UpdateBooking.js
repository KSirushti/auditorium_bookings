import React, { useEffect, useState } from "react";
import axios from "axios";
import "./AddBooking.css";

const UpdateBooking = () => {
  const [month, setMonth] = useState(new Date().getMonth());
  const [year, setYear] = useState(new Date().getFullYear());
  const [bookings, setBookings] = useState([]);
  const [selectedBookingId, setSelectedBookingId] = useState("");
  const [form, setForm] = useState({
    event_name: "",
    event_type: "",
    date: "",
    slot: "",
  });
  const [message, setMessage] = useState("");

  const EVENT_TYPES = [
    "Celebration",
    "Symposium",
    "Conference",
    "FDP",
    "Workshop",
    "Prize Distribution",
    "Seminar",
    "Hackathon",
    "Ph.D",
  ];

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await axios.get("http://127.0.0.1:8000/api/bookings/");
        const filtered = res.data.filter((b) => {
          const d = new Date(b.date);
          return d.getMonth() === month && d.getFullYear() === year;
        });
        setBookings(filtered);
      } catch (err) {
        console.error("Failed to fetch bookings:", err);
      }
    };

    fetchBookings();
  }, [month, year]);

  const handleBookingSelect = (id) => {
    setSelectedBookingId(id);
    const booking = bookings.find((b) => b.booking_id === parseInt(id));
    if (booking) {
      setForm({
        event_name: booking.event_name,
        event_type: booking.event_type,
        date: booking.date,
        slot: booking.slot,
      });
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!selectedBookingId) return;

    try {
      await axios.patch(`http://127.0.0.1:8000/api/bookings/${selectedBookingId}/`, {
        ...form,
        status: "PENDING", // Triggers PRO approval again
      });
      setMessage("✅ Booking updated and sent for PRO approval.");
    } catch (err) {
      console.error(err);
      setMessage("❌ Failed to update booking.");
    }
  };

  return (
    <div className="booking-page">
      <div className="booking-form-container">
        <h2 className="booking-title">Update Booking</h2>

        {/* Month & Year Filter */}
        <div className="calendar-controls">
          <select value={month} onChange={(e) => setMonth(Number(e.target.value))}>
            {Array.from({ length: 12 }).map((_, i) => (
              <option key={i} value={i}>
                {new Date(0, i).toLocaleString("default", { month: "long" })}
              </option>
            ))}
          </select>
          <input
            type="number"
            value={year}
            onChange={(e) => setYear(Number(e.target.value))}
            className="year-input"
          />
        </div>

        {/* Booking Dropdown */}
        <label>Select Booking</label>
        <select value={selectedBookingId} onChange={(e) => handleBookingSelect(e.target.value)}>
          <option value="">-- Select Booking --</option>
          {bookings.map((b) => (
            <option key={b.booking_id} value={b.booking_id}>
              #{b.booking_id} - {b.event_name} ({b.date})
            </option>
          ))}
        </select>

        {/* Booking Form */}
        {selectedBookingId && (
          <form className="booking-form" onSubmit={handleUpdate}>
            <label>Event Name</label>
            <input
              type="text"
              name="event_name"
              value={form.event_name}
              onChange={handleChange}
              required
            />

            <label>Event Type</label>
            <select
              name="event_type"
              value={form.event_type}
              onChange={handleChange}
              required
            >
              <option value="">-- Select Type --</option>
              {EVENT_TYPES.map((et) => (
                <option key={et} value={et}>
                  {et}
                </option>
              ))}
            </select>

            <label>Date</label>
            <input
              type="date"
              name="date"
              value={form.date}
              onChange={handleChange}
              required
            />

            <label>Slot</label>
            <select name="slot" value={form.slot} onChange={handleChange} required>
              <option value="">-- Select Slot --</option>
              <option value="FN">Forenoon</option>
              <option value="AN">Afternoon</option>
              <option value="FD">Full Day</option>
              <option value="ES">Evening Session</option>
            </select>

            <button type="submit">Update Booking</button>
          </form>
        )}
        {message && <p className="booking-message">{message}</p>}
      </div>
    </div>
  );
};

export default UpdateBooking;
