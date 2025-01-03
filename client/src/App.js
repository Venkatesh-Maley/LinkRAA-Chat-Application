import React, { useState, createContext } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Nav from './Nav';
import Register from './Register';
import Login from './Login';
import Myprofile from './Myprofile';
import Mainpage from './Mainpage';
import Share from './Share';
import Footer from './Footer'; // Import the new Footer component

export const store = createContext();

const App = () => {
  const [token, setToken] = useState(localStorage.getItem('token'));

  return (
    <store.Provider value={[token, setToken]}>
      <BrowserRouter>
        <div className="app-container">
          <Nav />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/myprofile" element={<Myprofile />} />
              <Route path="/mainpage" element={<Mainpage />} />
              <Route path="/share" element={<Share />} />
            </Routes>
          </main>
          <Footer /> {/* Add the Footer component here */}
        </div>
      </BrowserRouter>
    </store.Provider>
  );
};

export default App;