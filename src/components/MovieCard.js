import React, { useState } from 'react';
import API from '../utils/api';
import { toast } from 'react-toastify';
import EditMovie from './EditMovie';

const MovieCard = ({ movie, onUpdate }) => {
  const [editing, setEditing] = useState(false);

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this movie?')) return;

    try {
      await API.delete(`https://movie-watchlist-server-1.onrender.com/api/movies/${movie._id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      toast.success("Movie deleted successfully");
      onUpdate();
    } catch (error) {
      console.error('Error deleting movie:', error);
      toast.error(error.response?.data?.message || "Error deleting movie");
    }
  };

  const handleToggleWatched = async () => {
    try {
      await API.patch(`/movies/${movie._id}`, {
        watched: !movie.watched
      }, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      toast.success("Movie status updated");
      onUpdate();
    } catch (error) {
      console.error('Error updating movie:', error);
      toast.error(error.response?.data?.message || "Error updating movie");
    }
  };

  return (
    <div className="col-md-4 mb-3">
      <div className={`card ${movie.watched ? 'border-success' : ''}`}>
        <div className="card-body">
          <h5 className="card-title">{movie.title}</h5>
          <p className="card-text">
            Status: {movie.watched ? "Watched ✅" : "Not Watched ❌"}
          </p>
          <button onClick={handleToggleWatched} className="btn btn-sm btn-outline-secondary me-2">
            Toggle Watched
          </button>
          <button onClick={() => setEditing(true)} className="btn btn-sm btn-outline-primary me-2">
            Edit
          </button>
          <button onClick={handleDelete} className="btn btn-sm btn-outline-danger">
            Delete
          </button>
        </div>
      </div>
      {editing && (
        <EditMovie
          movie={movie}
          onClose={() => setEditing(false)}
          onUpdate={onUpdate}
        />
      )}
    </div>
  );
};

export default MovieCard;