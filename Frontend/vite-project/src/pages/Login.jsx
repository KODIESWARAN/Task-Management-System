import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
  const [formData, setFormData] = useState({
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
      const response = await axios.post('http://localhost:8000/auth/login', formData);
      
      // Save the token in localStorage
      localStorage.setItem('token', response.data.token);
      
      alert('Login successful!');
      navigate('/'); // Redirect to home page
    } catch (error) {
      console.error('Login error:', error);
      alert('Login failed. Check your credentials.');
    }
  };

  return (
    
    <div className="container mt-5">
      <h2 className="mb-4">Login</h2>
      <form onSubmit={handleSubmit} className="shadow p-4 rounded">
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

        <button type="submit" className="btn btn-success w-100">Login</button>
      </form>

      <p className="mt-3">
        Don't have an account? <Link to="/signup" className='text-decoration-none'>Signup here</Link>
      </p>
    </div>
  );
};

export default Login;
