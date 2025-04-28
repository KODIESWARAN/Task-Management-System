import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const Signup = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });
  
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8000/auth/signup', formData);
      alert('Signup successful! Please login.');
      navigate('/login');
    } catch (error) {
      console.error('Signup error:', error);
      alert('Signup failed. Try again.');
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Signup</h2>
      <form onSubmit={handleSubmit} className="shadow p-4 rounded">
        <div className="mb-3">
          <label className="form-label">Username</label>
          <input 
            type="text" 
            className="form-control" 
            name="username" 
            value={formData.username} 
            onChange={handleChange}
            required 
          />
        </div>
        
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input 
            type="email" 
            className="form-control" 
            name="email" 
            value={formData.email} 
            onChange={handleChange}
            required 
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Password</label>
          <input 
            type="password" 
            className="form-control" 
            name="password" 
            value={formData.password} 
            onChange={handleChange}
            required 
          />
        </div>

        <button type="submit" className="btn btn-primary w-100">Signup</button>
      </form>

      <p className="mt-3">
        Already have an account? <Link to="/login" className='text-decoration-none'>Login here</Link>
      </p>
    </div>
  );
};

export default Signup;
