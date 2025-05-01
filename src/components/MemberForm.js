import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './MemberForm.css';

const MemberForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    role: '',
    email: '',
    phone: ''
  });
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const formDataToSend = new FormData();
    formDataToSend.append('image', image);
    Object.entries(formData).forEach(([key, value]) => {
      formDataToSend.append(key, value);
    });

    try {
      await axios.post('http://localhost:5000/api/members', formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      navigate('/view-members');
    } catch (error) {
      console.error('Error adding member:', error);
    }
  };

  return (
    <div className="form-container">
      <h2>Add New Team Member</h2>
      <form onSubmit={handleSubmit} className="member-form">
        <div className="form-group">
          <label htmlFor="name">Full Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="role">Role</label>
          <input
            type="text"
            id="role"
            name="role"
            value={formData.role}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="phone">Phone</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
          />
        </div>

        <div className="form-group image-upload">
          <label htmlFor="image">Profile Image</label>
          <input
            type="file"
            id="image"
            name="image"
            accept="image/*"
            onChange={handleImageChange}
            required
          />
          {preview && (
            <div className="image-preview">
              <img src={preview} alt="Preview" />
            </div>
          )}
        </div>

        <button type="submit" className="submit-btn">
          Add Member
        </button>
      </form>
    </div>
  );
};

export default MemberForm;
