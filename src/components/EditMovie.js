import React, { useState } from "react";
import API from "../utils/api";
import { toast } from "react-toastify";

const EditMovie = ({ movie, onClose, onUpdate }) => {
  const [title, setTitle] = useState(movie.title);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.put(`https://movie-watchlist-server-1.onrender.com/api/movies/${movie._id}`,{ title },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      toast.success("Movie updated");
      onUpdate();
      onClose();
    } catch (error) {
      console.error("Error updating movie:", error);
      toast.error(error.response?.data?.message || "Error updating movie");
    }
  };

  return (
    <div className="modal d-block" tabIndex="-1">
      <div className="modal-dialog">
        <div className="modal-content p-3">
          <h5>Edit Movie</h5>
          <form onSubmit={handleSubmit}>
            <input
              className="form-control my-2"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
            <button className="btn btn-primary me-2">Update</button>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onClose}
            >
              Cancel
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditMovie;
