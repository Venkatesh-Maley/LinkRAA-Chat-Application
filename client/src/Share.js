import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import './Share.css'; // Import the custom CSS file

const Share = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    branch: '',
    passingYear: '',
    resumeLink: '',
    portfolioLink: '',
  });
  const [sharedDetails, setSharedDetails] = useState([]);

  useEffect(() => {
    const fetchSharedDetails = async () => {
      try {
        const response = await axios.get('http://localhost:5000/share1');
        setSharedDetails(response.data);
      } catch (error) {
        console.error('Fetch Shared Details Error:', error);
      }
    };

    fetchSharedDetails();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/share', formData, {
        headers: {
          'Content-Type': 'application/json',
          'x-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjY5ZDQ1NmQ0YjVjZTc3MzViZjQ4ZDc2In0sImlhdCI6MTcyMTkwMDk3NiwiZXhwIjoxNzIxOTA0NTc2fQ.3-tBUFvcw-iGDHqYkjRgLLnjofvxKw-Bqw9s50rEoU0'
        },
      });
      console.log(response.data);
      alert('Details shared successfully!');
      setFormData({
        name: '',
        email: '',
        phone: '',
        branch: '',
        passingYear: '',
        resumeLink: '',
        portfolioLink: '',
      });
      setSharedDetails(response.data);
    } catch (error) {
      if (error.response) {
        console.error('Error Response:', error.response.data);
        alert(`Error: ${error.response.data.error || 'An error occurred'}`);
      } else if (error.request) {
        console.error('Error Request:', error.request);
        alert('No response received from the server');
      } else {
        console.error('Error Message:', error.message);
        alert('An error occurred while setting up the request');
      }
    }
  };

  return (
    <div className="share-container container mt-4">
      <h2 className="share-title mb-4">Share Your Details with Alumni</h2>
      <form onSubmit={handleSubmit} className="share-form">
        <div className="form-group mb-3">
          <label htmlFor="name" className="form-label">Name:</label>
          <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} className="form-control" required />
        </div>
        <div className="form-group mb-3">
          <label htmlFor="email" className="form-label">Email:</label>
          <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} className="form-control" required />
        </div>
        <div className="form-group mb-3">
          <label htmlFor="phone" className="form-label">Phone No.:</label>
          <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleChange} className="form-control" required />
        </div>
        <div className="form-group mb-3">
          <label htmlFor="branch" className="form-label">Branch:</label>
          <input type="text" id="branch" name="branch" value={formData.branch} onChange={handleChange} className="form-control" required />
        </div>
        <div className="form-group mb-3">
          <label htmlFor="passingYear" className="form-label">Passing Year:</label>
          <input type="text" id="passingYear" name="passingYear" value={formData.passingYear} onChange={handleChange} className="form-control" required />
        </div>
        <div className="form-group mb-3">
          <label htmlFor="resumeLink" className="form-label">Resume Link:</label>
          <input type="text" id="resumeLink" name="resumeLink" value={formData.resumeLink} onChange={handleChange} className="form-control" />
        </div>
        <div className="form-group mb-3">
          <label htmlFor="portfolioLink" className="form-label">Portfolio Link:</label>
          <input type="text" id="portfolioLink" name="portfolioLink" value={formData.portfolioLink} onChange={handleChange} className="form-control" />
        </div>
        <button type="submit" className="submit-button btn btn-primary">Submit</button>
      </form>
    </div>
  );
};

export default Share;
