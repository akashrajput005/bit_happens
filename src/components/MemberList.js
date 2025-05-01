// frontend/src/components/MemberList.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './MemberList.css';

const MemberList = () => {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/members');
        setMembers(response.data);
      } catch (error) {
        console.error('Error fetching members:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMembers();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this member?')) {
      return;
    }

    try {
      await axios.delete(`http://localhost:5000/api/members/${id}`);
      setMembers(members.filter(member => member._id !== id));
    } catch (error) {
      console.error('Error deleting member:', error);
      alert('Failed to delete member. Please try again.');
    }
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
      </div>
    );
  }

  return (
    <div className="member-list-container">
      <h2>Team Members</h2>
      
      <div className="member-grid">
        {members.map(member => (
          <div key={member._id} className="member-card">
            <div className="member-image">
              <img src={`http://localhost:5000/uploads/${member.image}`} alt={member.name} />
            </div>
            <div className="member-info">
              <h3>{member.name}</h3>
              <p className="member-role">{member.role}</p>
              <p className="member-email">{member.email}</p>
            </div>
            <div className="member-actions">
              <Link to={`/member/${member._id}`} className="view-details-btn">
                View Details
              </Link>
              <button 
                onClick={() => handleDelete(member._id)}
                className="delete-btn"
                title="Delete Member"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MemberList;
