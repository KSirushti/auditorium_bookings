import React, { useEffect, useState } from "react";
import axios from "axios";
import "./AddBooking.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const DEPARTMENTS = [
  { id: 0, name: "Pro" },
  { id: 1, name: "CSE" },
  { id: 2, name: "CSE ETech" },
  { id: 3, name: "Mech" },
  { id: 4, name: "ECE" },
  { id: 5, name: "Arts" },
  { id: 6, name: "SIMS" },
  { id: 7, name: "MBA" },
  { id: 8, name: "BBA" },
  { id: 9, name: "MCA" },
];

const EVENT_TYPES = [
  "Celebration",
  "Symposium",
  "Conference",
  "FDP",
  "Workshop",
  "Prize Distribution",
  "Seminar",
];

const AddBooking = () => {
  const [form, setForm] = useState({
    user: "",
    department: "",
    event_name: "",
    event_type: "",
    date: "",
    slot: "",
  });
  const [message, setMessage] = useState("");
  const [availableSlots, setAvailableSlots] = useState([]);
  const [allBookings, setAllBookings] = useState([]);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await axios.get("http://127.0.0.1:8000/api/bookings/");
        setAllBookings(res.data);
      } catch (err) {
        console.error("Error fetching bookings:", err);
      }
    };
    fetchBookings();
  }, []);

  const handleDeptChange = (e) => {
    const selected = DEPARTMENTS.find((d) => d.name === e.target.value);
    setForm({ ...form, department: selected?.id || "" });
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleDateChange = (date) => {
    const formatted = date.toISOString().split("T")[0];
    const bookingsForDate = allBookings.filter(
      (b) => b.date === formatted && b.status === "APPROVED"
    );
    const bookedSlots = bookingsForDate.flatMap((b) =>
      b.slot === "FD" ? ["FN", "AN"] : [b.slot]
    );

    const slots = ["FN", "AN", "FD", "ES"].filter((slot) => {
      if (slot === "FD") return !bookedSlots.includes("FN") && !bookedSlots.includes("AN");
      return !bookedSlots.includes(slot);
    });

    setAvailableSlots(slots);
    setForm({ ...form, date: formatted, slot: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://127.0.0.1:8000/api/bookings/", form);
      setMessage("✅ Booking submitted successfully!");
    } catch (err) {
      setMessage(err.response?.data?.non_field_errors?.[0] || "❌ Booking failed.");
    }
  };

  return (
    <div className="booking-page">
      <div className="booking-form-container">
        <h2 className="booking-title">Add Auditorium Booking</h2>
        <form className="booking-form" onSubmit={handleSubmit}>
          <label>User ID</label>
          <input
            type="text"
            name="user"
            value={form.user}
            onChange={handleChange}
            required
          />

          <label>Department Name</label>
          <select onChange={handleDeptChange} required>
            <option value="">-- Select Department --</option>
            {DEPARTMENTS.map((dept) => (
              <option key={dept.id} value={dept.name}>
                {dept.name}
              </option>
            ))}
          </select>
          <input type="hidden" name="department" value={form.department} readOnly />

          <label>Event Name</label>
          <input
            type="text"
            name="event_name"
            value={form.event_name}
            onChange={handleChange}
            required
          />

          <label>Event Type</label>
          <select name="event_type" value={form.event_type} onChange={handleChange} required>
            <option value="">-- Select Event Type --</option>
            {EVENT_TYPES.map((et, idx) => (
              <option key={idx} value={et}>
                {et}
              </option>
            ))}
          </select>

          <label>Date</label>
          <DatePicker
            selected={form.date ? new Date(form.date) : null}
            onChange={handleDateChange}
            minDate={new Date()}
            placeholderText="Select a date"
            filterDate={(date) => {
              const formatted = date.toISOString().split("T")[0];
              const sameDay = allBookings.filter(
                (b) => b.date === formatted && b.status === "APPROVED"
              );
              const bookedSlots = sameDay.flatMap((b) =>
                b.slot === "FD" ? ["FN", "AN"] : [b.slot]
              );
              return !(bookedSlots.includes("FN") &&
                       bookedSlots.includes("AN") &&
                       bookedSlots.includes("ES"));
            }}
            dateFormat="dd-MM-yyyy"
          />

          <label>Slot</label>
          <select name="slot" value={form.slot} onChange={handleChange} required>
            <option value="">-- Select Slot --</option>
            {availableSlots.map((slot, i) => (
              <option key={i} value={slot}>
                {slot === "FN"
                  ? "Forenoon"
                  : slot === "AN"
                  ? "Afternoon"
                  : slot === "FD"
                  ? "Full Day"
                  : "Evening Session"}
              </option>
            ))}
          </select>

          <button type="submit">Submit Booking</button>
        </form>
        {message && <p className="booking-message">{message}</p>}
      </div>
    </div>
  );
};

export default AddBooking;
