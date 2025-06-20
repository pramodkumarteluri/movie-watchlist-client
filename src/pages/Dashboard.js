import React, { useEffect, useState } from 'react';
import API from '../utils/api';
import { toast } from 'react-toastify';
import AddMovie from '../components/AddMovie';
import MovieList from '../components/MovieList';

const Dashboard = () => {
  const [movies, setMovies] = useState([]);

  const fetchMovies = async () => {
    try {
      const { data } = await API.get('https://movie-watchlist-server-1.onrender.com/api/movies', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      setMovies(data);
    } catch (error) {
      toast.error("Failed to load movies");
    }
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  return (
    <div className="container mt-4">
      <h2>My Movie Watchlist</h2>
      <AddMovie onAdd={fetchMovies} />
      <MovieList movies={movies} onUpdate={fetchMovies} />
    </div>
  );
};

export default Dashboard;