import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!username || !email || !password) {
      return setError("All fields are required");
    }

    try {
      const res = await axios.post("https://movie-watchlist-server-1.onrender.com/auth/register", {
        username,
        email,
        password,
      });

      localStorage.setItem("token", res.data.token);
      navigate("/dashboard");
    } catch (err) {
      console.error("Registration failed", err.response?.data?.error || err.message);
      setError(err.response?.data?.error || "Registration failed");
    }
  };

  return (
    <div className="register-container container d-flex justify-content-center align-items-center vh-100">
  <div className="card shadow p-4" style={{ maxWidth: '400px', width: '100%' }}>
    <h2 className="text-center mb-4">Register</h2>
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div className="mb-3">
        <input
          type="email"
          className="form-control"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="mb-3">
        <input
          type="password"
          className="form-control"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button type="submit" className="btn btn-success w-100">Register</button>
    </form>
    {error && <p className="text-danger text-center mt-3">{error}</p>}
    <p className="text-muted text-center mt-3" style={{ fontSize: '0.9rem' }}>
      Already have an account? <Link to="/login">Login here</Link>
    </p>
  </div>
</div>
  );
};

export default Register;