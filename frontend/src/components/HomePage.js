// src/components/HomePage.js
import React from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css';

const HomePage = () => {
  return (
    <div className="home-container">
      <header className="team-header">
        <h1>Student Team Members Management System</h1>
        <p className="team-subtitle">Welcome to our team management portal</p>
      </header>
      
      <div className="action-buttons">
        <Link to="/add-member" className="btn primary-btn">
          <i className="fas fa-user-plus"></i> Add New Member
        </Link>
        <Link to="/view-members" className="btn secondary-btn">
          <i className="fas fa-users"></i> View Members
        </Link>
      </div>
    </div>
  );
};

export default HomePage;