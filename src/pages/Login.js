import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setErrorMsg("Please enter both email and password");
      return;
    }

    try {
      const res = await fetch("https://movie-watchlist-server-09u5.onrender.com/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setErrorMsg(data.error || "Invalid login credentials");
        return;
      }

      localStorage.setItem("token", data.token);
      navigate("/dashboard");
    } catch (error) {
      console.error("Login error:", error);
      setErrorMsg("Something went wrong. Try again later.");
    }
  };

  return (
    <div className="login-container container d-flex justify-content-center align-items-center vh-100">
  <div className="card shadow p-4" style={{ maxWidth: '400px', width: '100%' }}>
    <h2 className="text-center mb-4">Login</h2>
    {errorMsg && <p className="text-danger text-center">{errorMsg}</p>}
    <form onSubmit={handleSubmit}>
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
      <button type="submit" className="btn btn-primary w-100">Login</button>
    </form>
    <div className="text-center mt-3">
      <Link to="/forgot-password" className="text-muted d-block" style={{ fontSize: '0.9rem' }}>
        Forgot your password?
      </Link>
      <p className="text-muted" style={{ fontSize: '0.9rem' }}>
        Don’t have an account? <Link to="/register">Register here</Link>
      </p>
    </div>
  </div>
</div>
  );
};

export default Login;