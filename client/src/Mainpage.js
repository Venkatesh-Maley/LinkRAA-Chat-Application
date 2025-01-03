import React, { useContext } from 'react';
import { store } from './App';
import { useNavigate, Navigate } from 'react-router-dom';
import './Mainpage.css'; // We'll create this CSS file

const Mainpage = () => {
  const navigate = useNavigate();
  const [token, setToken] = useContext(store);

  if (!token) {
    return <Navigate to='/' />;
  }

  const handleProfileClick = () => {
    navigate('/myprofile');
  };

  const handleShareClick = () => {
    navigate('/share');
  };

  return (
    <div className="mainpage-container">
      <h1 className="mainpage-title">Welcome to Alumni Networking Portal</h1>
      <p className="mainpage-text">Connect with fellow alumni, share experiences, and grow your professional network.</p>
      <div className="button-container">
        <button className="mainpage-button" onClick={handleProfileClick}>Join Alumni Group Chat</button>
        <button className="mainpage-button" onClick={handleShareClick}>Share your Resume with Alumni</button>
        <button className="mainpage-button logout-button" onClick={() => setToken(null)}>Logout</button>
      </div>
    </div>
  );
};

export default Mainpage;