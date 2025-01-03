import React, { useState, useContext } from 'react';
import axios from 'axios';
import { store } from './App';
import { Navigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import './Login.css'; // Import the custom CSS file

const Login = () => {
    const [token, setToken] = useContext(store);
    const [data, setData] = useState({
        email: '',
        password: ''
    });
    const [error, setError] = useState('');

    const changeHandler = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        setError('');
        try {
            const response = await axios.post('http://localhost:5000/login', data);
            setToken(response.data.token);
        } catch (err) {
            if (err.response && err.response.data && err.response.data.message) {
                setError(err.response.data.message);
            } else {
                setError('An unexpected error occurred.');
            }
            console.error(err);
        }
    };



    
    if (token) {
        return <Navigate to='/mainpage' />;
    }

    return (
        <div className="login-container d-flex justify-content-center align-items-center">
            <form onSubmit={submitHandler} autoComplete="off" className="login-form p-4">
                <h2 className="text-center">Login</h2>
                {error && <p className="error-message text-center">{error}</p>}
                <div className="mb-3">
                    <input
                        type="text"
                        onChange={changeHandler}
                        name="email"
                        placeholder="Email"
                        value={data.email}
                        className="form-control"
                    />
                </div>
                <div className="mb-3">
                    <input
                        type="password"
                        onChange={changeHandler}
                        name="password"
                        placeholder="Password"
                        value={data.password}
                        className="form-control"
                    />
                </div>
                <button type="submit" className="btn btn-primary w-100">
                    Login
                </button>
            </form>
        </div>
    );
};

export default Login;
