import React, { useState } from 'react';
import API from '../utils/api';
import { toast } from 'react-toastify';

const AddMovie = ({ onAdd }) => {
  const [form, setForm] = useState({
    title: '',
    genre: '',
    status: 'To Be Watched',
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post('https://movie-watchlist-server-09u5.onrender.com/api/movies', form, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      toast.success('Movie added');
      setForm({ title: '', genre: '', status: 'To Be Watched' });
      onAdd();
    } catch {
      toast.error('Failed to add movie');
    }
  };

  return (
    <form className="card p-3 mb-4" onSubmit={handleSubmit}>
      <div className="row g-3 align-items-center">
        <div className="col-md-4">
          <input
            type="text"
            name="title"
            className="form-control"
            placeholder="Movie Title"
            value={form.title}
            onChange={handleChange}
            required
          />
        </div>
        <div className="col-md-3">
          <input
            type="text"
            name="genre"
            className="form-control"
            placeholder="Genre (e.g., Action, Drama)"
            value={form.genre}
            onChange={handleChange}
            required
          />
        </div>
        <div className="col-md-3">
          <select
            name="status"
            className="form-select"
            value={form.status}
            onChange={handleChange}
            required
          >
            <option>To Be Watched</option>
            <option>Watched</option>
          </select>
        </div>
        <div className="col-md-2">
          <button type="submit" className="btn btn-primary w-100">
            Add
          </button>
        </div>
      </div>
    </form>
  );
};

export default AddMovie;