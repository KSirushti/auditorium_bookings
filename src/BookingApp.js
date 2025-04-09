import React, { useEffect, useState } from "react";
import "./BookingApp.css";
import axios from "axios";

const BookingApp = () => {
  const [month, setMonth] = useState(new Date().getMonth());
const [year, setYear] = useState(new Date().getFullYear());
  const [calendarData, setCalendarData] = useState([]);

  useEffect(() => {
    const fetchApprovedBookings = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/bookings/");
        const bookings = response.data.filter((b) => b.status === "APPROVED"); // Only approved

        const daysInMonth = new Date(year, month + 1, 0).getDate();
        const dayNames = ["SUN", "MON", "TUES", "WED", "THUR", "FRI", "SAT"];

        const calendar = Array.from({ length: daysInMonth }, (_, i) => {
          const dateObj = new Date(year, month, i + 1);
          const dateStr = dateObj.toISOString().split("T")[0];

          const row = {
            date: i + 1,
            day: dayNames[dateObj.getDay()],
            morning: "",
            afternoon: "",
            evening: "",
          };

          bookings
            .filter((b) => b.date === dateStr)
            .forEach((b) => {
              const label = `${b.event_name} - ${b.event_type}`;
              const colored = (
                <span
                  className={
                    b.slot === "FD"
                      ? "approved-fd"
                      : b.slot === "FN"
                      ? "approved-fn"
                      : b.slot === "AN"
                      ? "approved-an"
                      : "approved-es"
                  }
                >
                  {label}
                </span>
              );

              if (b.slot === "FD") {
                row.morning = colored;
                row.afternoon = colored;
              } else if (b.slot === "FN") {
                row.morning = colored;
              } else if (b.slot === "AN") {
                row.afternoon = colored;
              } else if (b.slot === "ES") {
                row.evening = colored;
              }
            });

          return row;
        });

        setCalendarData(calendar);
      } catch (error) {
        console.error("Error fetching approved bookings:", error);
      }
    };

    fetchApprovedBookings();
  }, [month, year]);

  return (
    <div className="booking-table-page">
      <h2 className="calendar-title">
        Auditorium Booking Calendar -{" "}
        {new Date(year, month).toLocaleString("default", {
          month: "long",
          year: "numeric",
        })}
      </h2>

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
            {calendarData.length === 0 ? (
              <tr>
                <td colSpan="5" style={{ textAlign: "center", padding: "1rem" }}>
                  No approved bookings.
                </td>
              </tr>
            ) : (
              calendarData.map((row, idx) => (
                <tr key={idx}>
                  <td>{row.date}</td>
                  <td>{row.day}</td>
                  <td>{row.morning}</td>
                  <td>{row.afternoon}</td>
                  <td>{row.evening}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BookingApp;
