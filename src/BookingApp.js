import React, { useEffect, useState, useCallback } from "react";
import api from "./api";
import "./BookingApp.css";

const dayNames = ["SUN", "MON", "TUES", "WED", "THUR", "FRI", "SAT"];

const BookingApp = () => {
  const [month, setMonth] = useState(new Date().getMonth()); // 0–11
  const [year, setYear] = useState(new Date().getFullYear());
  const [calendarData, setCalendarData] = useState([]);

  const fetchBookings = useCallback(async () => {
    try {
      const response = await api.get("/api/bookings/");

      // ✅ ONLY APPROVED BOOKINGS
      const bookings = response.data.filter(
        (b) => b.status === "APPROVED"
      );

      const daysInMonth = new Date(year, month + 1, 0).getDate();

      const calendar = Array.from({ length: daysInMonth }, (_, i) => {
        const dateObj = new Date(year, month, i + 1);
        const dateStr = dateObj.toISOString().split("T")[0];

        const row = {
          date: i + 1,
          day: dayNames[dateObj.getDay()],
          morning: null,
          afternoon: null,
          evening: null,
        };

        bookings
          .filter((b) => b.date === dateStr)
          .forEach((b) => {
            const label = `${b.event_name}`;

            const slotUI = (
  <span
    className={
      b.slot === "FD"
        ? "slot-full"       // Morning + Afternoon → Sky blue
        : b.slot === "FN"
        ? "slot-morning"    // Morning → Yellow
        : b.slot === "AN"
        ? "slot-afternoon"  // Afternoon → Light purple
        : "slot-evening"    // Evening → Green
    }
  >
    {label}
  </span>
);


            // ✅ SLOT MAPPING
            if (b.slot === "FD") {
              row.morning = slotUI;
              row.afternoon = slotUI;
              row.evening = slotUI;
            } else if (b.slot === "FN") {
              row.morning = slotUI;
            } else if (b.slot === "AN") {
              row.afternoon = slotUI;
            } else if (b.slot === "ES") {
              row.evening = slotUI;
            }
          });

        return row;
      });

      setCalendarData(calendar);
    } catch (error) {
      console.error("Error fetching bookings:", error);
    }
  }, [month, year]);

  useEffect(() => {
    fetchBookings();
  }, [fetchBookings]);

  return (
    <div className="booking-table-page">
      <h2 className="calendar-title">
        Auditorium Booking Calendar –{" "}
        {new Date(year, month).toLocaleString("default", {
          month: "long",
          year: "numeric",
        })}
      </h2>

      {/* Controls */}
      <div className="calendar-controls">
        <select value={month} onChange={(e) => setMonth(+e.target.value)}>
          {Array.from({ length: 12 }).map((_, i) => (
            <option key={i} value={i}>
              {new Date(0, i).toLocaleString("default", { month: "long" })}
            </option>
          ))}
        </select>

        <input
          type="number"
          value={year}
          onChange={(e) => setYear(+e.target.value)}
          className="year-input"
        />
      </div>

      {/* Calendar Table */}
      <div className="table-wrapper">
        <table className="booking-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Day</th>
              <th>Morning</th>
              <th>Afternoon</th>
              <th>Evening</th>
            </tr>
          </thead>
          <tbody>
            {calendarData.map((row, idx) => (
              <tr key={idx}>
                <td>{row.date}</td>
                <td>{row.day}</td>
                <td>{row.morning}</td>
                <td>{row.afternoon}</td>
                <td>{row.evening}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BookingApp;
