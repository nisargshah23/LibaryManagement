import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../style/login.css"; // Import the CSS file
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(""); // Reset error before making API call

    try {
      const response = await axios.post("http://localhost:5000/api/auth/signin", {
        email,
        password,
      });

      const { token, role } = response.data;
      console.log(response)
      localStorage.setItem("token", token);
      console.log(role)
      localStorage.setItem("role", role); 
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed!");
      console.log(err)
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
