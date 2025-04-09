import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

const VALID_USER_IDS = ["1", "2", "3", "4", "5"];
const FIXED_PASSWORD = "1234*";

const Login = () => {
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    // PRO login
    if (userId === "admin" && password === "admin") {
      localStorage.setItem("isPRO", "true");
      navigate("/booking");

      return;
    }

    // Normal user login
    if (VALID_USER_IDS.includes(userId) && password === FIXED_PASSWORD) {
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("userId", userId);
      navigate("/booking");
    } else {
      setError("Invalid credentials. Please try again.");
    }
  };

  return (
    <div className="login-page">
      <div className="login-box">
        <h2 className="login-title">Login</h2>
        <form onSubmit={handleLogin}>
          <label>User ID</label>
          <input
            type="text"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            required
          />

          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit">Login</button>
        </form>
        {error && <p className="login-error">{error}</p>}
      </div>
    </div>
  );
};

export default Login;
