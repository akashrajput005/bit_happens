// frontend/src/components/MemberDetail.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './MemberDetail.css';

const MemberDetail = () => {
  const { id } = useParams();
  const [member, setMember] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMember = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/members/${id}`);
        setMember(response.data);
      } catch (error) {
        console.error('Error fetching member:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMember();
  }, [id]);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
      </div>
    );
  }

  if (!member) {
    return <div className="error-message">Member not found</div>;
  }

  return (
    <div className="member-detail-container">
      <div className="member-detail-header">
        <h2>Member Details</h2>
        <div className="member-image-large">
          <img src={`http://localhost:5000/uploads/${member.image}`} alt={member.name} />
        </div>
      </div>

      <div className="member-info-grid">
        <div className="info-item">
          <span className="info-label">Name:</span>
          <span className="info-value">{member.name}</span>
        </div>
        
        <div className="info-item">
          <span className="info-label">Role:</span>
          <span className="info-value">{member.role}</span>
        </div>
        
        <div className="info-item">
          <span className="info-label">Email:</span>
          <span className="info-value">{member.email}</span>
        </div>
        
        <div className="info-item">
          <span className="info-label">Phone:</span>
          <span className="info-value">{member.phone || 'Not provided'}</span>
        </div>
        
        <div className="info-item">
          <span className="info-label">Joined:</span>
          <span className="info-value">
            {new Date(member.createdAt).toLocaleDateString()}
          </span>
        </div>
      </div>
    </div>
  );
};

export default MemberDetail;
