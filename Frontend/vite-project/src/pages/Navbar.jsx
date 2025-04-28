import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const handleLogout = async () => {
    try {
      if (token) {
        await axios.post('http://localhost:8000/auth/logout', {}, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        localStorage.removeItem('token');
        navigate('/');
      }
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <Link className="navbar-brand" to="/">Task Manager</Link>
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav ms-auto">
            {!token ? (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/login">
                  <button className="btn btn-outline-light">Login</button>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/signup">
                   <button className="btn btn-outline-light">Signup</button>
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <button onClick={handleLogout} className="btn btn-outline-light">
                    Logout
                  </button>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
