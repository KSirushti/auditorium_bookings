import React, { useState } from "react";
import api from "./api";
import "./AddUser.css";

const AddUser = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    mobile: "",
    designation: "",
    role: "",
    department_id: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/api/users/", user);
      setMessage("✅ User added successfully!");
      setUser({
        name: "",
        email: "",
        mobile: "",
        designation: "",
        role: "",
        department_id: "",
      });
    } catch (err) {
      console.error(err);
      setMessage("❌ Error adding user.");
    }
  };

  return (
    <div className="add-user-container">
      <h2>Add New User</h2>
      <form onSubmit={handleSubmit} className="add-user-form">
  <label>Name</label>
  <input type="text" name="name" value={user.name} onChange={handleChange} required />

  <label>Email</label>
  <input type="email" name="email" value={user.email} onChange={handleChange} required />

  <label>Mobile</label>
  <input type="text" name="mobile" value={user.mobile} onChange={handleChange} required />

  <label>Designation</label>
  <input type="text" name="designation" value={user.designation} onChange={handleChange} required />

  <label>Role</label>
  <select name="role" value={user.role} onChange={handleChange} required>
    <option value="">-- Select Role --</option>
    <option value="PRO">PRO</option>
    <option value="STAFF">Staff</option>
  </select>

  <label>Department ID</label>
  <input type="number" name="department_id" value={user.department_id} onChange={handleChange} />

  <button type="submit">Add User</button>
</form>

      {message && <p className="user-message">{message}</p>}
    </div>
  );
};

export default AddUser;
