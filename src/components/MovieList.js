import React from 'react';
import API from '../utils/api';
import { toast } from 'react-toastify';

const MovieList = ({ movies, onUpdate }) => {
const handleDelete = async (id) => {
   if (!window.confirm('Are you sure you want to delete this movie?')) {
     return;
   }
    try {
      await API.delete(`https://movie-watchlist-server-09u5.onrender.com/api/movies/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      toast.success('Movie deleted');
      onUpdate();
   } catch (error) {
     console.error('Delete error:', error);
     toast.error(error.response?.data?.message || 'Failed to delete movie');
    }
  };

  return (
    <div className="row">
      {movies.map((movie) => (
        <div className="col-md-4 mb-4" key={movie._id}>
          <div className="card shadow-sm">
            <div className="card-body">
              <h5 className="card-title">{movie.title}</h5>
              <p className="card-text mb-1"><strong>Genre:</strong> {movie.genre}</p>
              <p className="card-text"><strong>Status:</strong> 
                <span className={`badge ms-2 ${movie.status === 'Watched' ? 'bg-success' : 'bg-warning text-dark'}`}>
                  {movie.status}
                </span>
              </p>
              <button
                className="btn btn-danger btn-sm"
                onClick={() => handleDelete(movie._id)}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MovieList;