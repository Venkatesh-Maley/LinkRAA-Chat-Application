import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { store } from './App';

const Firstpage = () => {
  const navigate = useNavigate();
  const [token] = useContext(store);

  const handleClick = () => {
    if (token) {
      navigate('/mainpage'); // Navigate to Mainpage.js if the user is logged in
    } else {
      navigate('/login'); // Navigate to Login.js if the user is not logged in
    }
  };

  const styles = {
    container: {
      textAlign: 'center',
    },
    text: {
      margin: '20px 0',
    },
  };

  return (
    <div>
      <div style={styles.container}>
        <h1>Welcome to Our RGUKT Alumni Networking Portal</h1>
        <p style={styles.text}>This is some random text to fill the main page content.</p>
        <button onClick={handleClick}>Join Our RGUKT Network</button>
        <br />
        <br />
      </div>
    </div>
  );
};

export default Firstpage;
