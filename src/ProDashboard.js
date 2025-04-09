import React, { useEffect, useState } from "react";
import axios from "axios";
import "./ProDashboard.css";

const ProDashboard = () => {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      const res = await axios.get("http://127.0.0.1:8000/api/bookings/");
      const pending = res.data.filter((req) => req.status === "PENDING");
      setRequests(pending);
    } catch (err) {
      console.error("Failed to fetch booking requests:", err);
    }
  };

  const handleApprove = async (bookingId) => {
    try {
      await axios.patch(`http://127.0.0.1:8000/api/bookings/${bookingId}/`, {
        status: "APPROVED",
      });
      fetchRequests();
    } catch (err) {
      console.error("Failed to approve booking:", err);
    }
  };

  const handleReject = async (bookingId) => {
    try {
      await axios.patch(`http://127.0.0.1:8000/api/bookings/${bookingId}/`, {
        status: "REJECTED",
      });
      fetchRequests();
    } catch (err) {
      console.error("Failed to reject booking:", err);
    }
  };

  return (
    <div className="pro-dashboard">
      <h2 className="dashboard-title">PRO Dashboard – Approve Bookings</h2>
      {requests.length === 0 ? (
        <p className="no-requests">No pending requests.</p>
      ) : (
        <table className="pro-table">
          <thead>
            <tr>
              <th>Booking ID</th>
              <th>Event Name</th>
              <th>Type</th>
              <th>Date</th>
              <th>Slot</th>
              <th>Dept</th>
              <th>User</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((req) => (
              <tr key={req.booking_id}>
                <td>{req.booking_id}</td>
                <td>{req.event_name}</td>
                <td>{req.event_type}</td>
                <td>{req.date}</td>
                <td>{req.slot}</td>
                <td>{req.department_id}</td>
                <td>{req.user_id}</td>
                <td>
                  <button
                    className="approve-btn"
                    onClick={() => handleApprove(req.booking_id)}
                  >
                    Approve
                  </button>
                  <button
                    className="reject-btn"
                    onClick={() => handleReject(req.booking_id)}
                  >
                    Reject
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

export default ProDashboard;
