import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import "../Styles/Login.css";
function Login() {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  // Redirect if already logged in
  useEffect(() => {

    const token = localStorage.getItem("token"); //save token in localstorage

    if (token) {
      const decoded = jwtDecode(token);
      const role = decoded.role;
      const userId = decoded.sub;

      if (role === "MANAGER") {
        navigate("/dashboard", { replace: true });
      } else {
        navigate(`/yourtasks/${userId}`, { replace: true });
      }
    }

  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {

      const response = await fetch("http://localhost:8080/taskManagementApi/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          username: username,
          password: password
        })
      });

      const data = await response.json();

      if (data.token) {

        // store the jwt  token
        localStorage.setItem("token", data.token);

        //Decode token
        const decoded = jwtDecode(data.token);
        const role = decoded.role;
        const userId = decoded.sub;

        //  based on role redirect
        if (role === "MANAGER") {
          navigate("/dashboard", { replace: true });
        } else {
          navigate(`/yourtasks/${userId}`, { replace: true }); //history remove replace true
        }

      } else {
        alert("Invalid username or password");
      }

    } catch (error) {
      console.error("Login error:", error);
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