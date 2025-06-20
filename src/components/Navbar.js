import React from 'react';
import '../App.css';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();

const logout = () => {
  try {
    localStorage.removeItem('token');
  } catch (error) {
    console.warn('Failed to remove token from localStorage:', error);
  } finally {
    navigate('/');
  }
 };

  return (
    <nav className="navbar navbar-expand-lg navbar-light custom-navbar px-5">
      <Link className="navbar-brand" to="/">Movie Watchlist</Link>
      <div className="collapse navbar-collapse">
        <ul className="navbar-nav ms-auto">
          {localStorage.getItem('token') ? (
            <>
              <li className="nav-item">
                <Link className="nav-link" to="/dashboard">Dashboard</Link>
              </li>
              <li className="nav-item">
                <button className="btn btn-danger btn-sm mt-1 ms-2" onClick={logout}>Logout</button>
              </li>
            </>
          ) : (
            <>
              <li className="nav-item me-2">
                <Link to="/login" className="btn btn-outline-secondary btn-sm">
                  Login
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/register" className="btn btn-outline-secondary btn-sm">
                  Register
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;