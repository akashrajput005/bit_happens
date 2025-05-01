import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import HomePage from './components/HomePage';
import MemberForm from './components/MemberForm';
import MemberList from './components/MemberList';
import MemberDetail from './components/MemberDetail';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app-container">
        <nav className="main-nav">
          <h1 className="nav-title">Team Management</h1>
          <div className="nav-links">
            <Link to="/" className="nav-link">Home</Link>
            <Link to="/add-member" className="nav-link">Add Member</Link>
            <Link to="/view-members" className="nav-link">View Members</Link>
          </div>
        </nav>

        <main className="main-content">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/add-member" element={<MemberForm />} />
            <Route path="/view-members" element={<MemberList />} />
            <Route path="/member/:id" element={<MemberDetail />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
