import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="container d-flex flex-column flex-lg-row align-items-center justify-content-center min-vh-100 text-center gap-4">
      <div className="text-section">
        <h1 className="mb-3 fw-bold">Welcome to Movie Watchlist 🎬</h1>
        <p className="mb-4 text-muted fs-5">
          Organize your favorite movies, track what you’ve watched, and never miss a must-see again.  
        </p>
        <Link to="/register" className="btn btn-outline-dark px-4 py-2">
          Get Started
        </Link>
      </div>
    </div>
  );
};

export default Home;