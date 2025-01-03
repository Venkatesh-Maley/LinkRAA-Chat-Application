import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { store } from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Nav.css';
import logoImage from './rguraa.png'; // Import the image

const Nav = () => {
    const [token] = useContext(store);

    return (
        <nav className="navbar navbar-expand-lg navbar-dark custom-bg">
            <div className="container-fluid">
                <Link to="/mainpage" className="navbar-brand d-flex align-items-center">
                    <div className="logo-container d-flex align-items-center">
                        <span className="logo-text">LINK</span>
                        <img src={logoImage} alt="RAA Logo" className="logo-image ms-2" />
                    </div>
                </Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ms-auto">
                        {!token && (
                            <>
                                <li className="nav-item">
                                    <Link to="/register" className="nav-link">Register</Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="/" className="nav-link">Login</Link>
                                </li>
                            </>
                        )}
                        {token && (
                            <>
                                <li className="nav-item">
                                    <Link to="/" className="nav-link">Home</Link>
                                </li>
                                {/* Add more navigation items for logged-in users if needed */}
                            </>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Nav;
