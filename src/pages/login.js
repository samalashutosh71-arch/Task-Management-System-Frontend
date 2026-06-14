import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import "../Styles/Login.css";
import { loginUser } from "../services/api";


function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  // Redirect if already logged in
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      try {
        const decoded = jwtDecode(token);
        const role = decoded.role;
        const userId = decoded.sub;

        if (role === "MANAGER") {
          navigate("/dashboard", { replace: true });
        } else {
          navigate(`/yourtasks/${userId}`, { replace: true });
        }
      } catch (err) {
        console.error("Invalid token");
        localStorage.removeItem("token");
      }
    }
  }, [navigate]);

  // ================= LOGIN =================
  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const data = await loginUser(username, password);

      if (data?.token) {
        // store token
        localStorage.setItem("token", data.token);

        // decode token
        const decoded = jwtDecode(data.token);
        const role = decoded.role;
        const userId = decoded.sub;

        // redirect based on role
        if (role === "MANAGER") {
          navigate("/dashboard", { replace: true });
        } else {
          navigate(`/yourtasks/${userId}`, { replace: true });
        }
      } else {
        alert("Invalid username or password");
      }
    } catch (error) {
      console.error("Login error:", error.message);
      alert("Server error. Try again.");
    }
  };

  return (
    <div className="login-container">
      <h2>Login Page</h2>

      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Enter Email"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <br /><br />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <br /><br />

        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;