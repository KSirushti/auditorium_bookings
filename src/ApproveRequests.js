import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "./Navbar";
import "./ApproveRequests.css";

const ApproveRequests = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/bookings/");
      setBookings(response.data);
    } catch (err) {
      console.error("Error fetching bookings:", err);
    }
  };

  const handleAction = async (id, newStatus) => {
    try {
      await axios.patch(`http://127.0.0.1:8000/api/bookings/${id}/`, {
        status: newStatus,
      });
      fetchBookings(); // Refresh after action
    } catch (err) {
      console.error("Error updating status:", err);
    }
  };

  const pending = bookings.filter((b) => b.status === "Pending");

  return (
    <div className="approve-page">
      <Navbar />
      <h2 className="approve-title">🔐 PRO Booking Approvals</h2>

      {pending.length === 0 ? (
        <p className="no-requests">No pending requests 🎉</p>
      ) : (
        <table className="approve-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Slot</th>
              <th>Event</th>
              <th>Department</th>
              <th>User</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {pending.map((b) => (
              <tr key={b.id}>
                <td>{b.date}</td>
                <td>{b.slot}</td>
                <td>{b.event_name}</td>
                <td>{b.department}</td>
                <td>{b.user}</td>
                <td>
                  <button
                    className="approve-btn"
                    onClick={() => handleAction(b.id, "Approved")}
                  >
                    ✅ Approve
                  </button>
                  <button
                    className="reject-btn"
                    onClick={() => handleAction(b.id, "Rejected")}
                  >
                    ❌ Reject
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ApproveRequests;
