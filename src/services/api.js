// frontend/src/services/api.js
import axios from 'axios';

const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000/api',
});

export const getMembers = () => API.get('/members');
export const getMember = (id) => API.get(`/members/${id}`);
export const createMember = (data) => {
  const formData = new FormData();
  Object.entries(data).forEach(([key, val]) => formData.append(key, val));
  return API.post('/members', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
};
export const updateMember = (id, data) => {
  const formData = new FormData();
  Object.entries(data).forEach(([key, val]) => formData.append(key, val));
  return API.put(`/members/${id}`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
};
export const deleteMember = (id) => API.delete(`/members/${id}`);
