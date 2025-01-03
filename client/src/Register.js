import React, { useState } from 'react';
import axios from 'axios';
import './Register.css';

const Register = () => {
    const [data, setData] = useState({
        username: '',
        email: '',
        password: '',
        confirmpassword: ''
    });
    const [error, setError] = useState('');

    const changeHandler = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        setError('');

        if (data.password !== data.confirmpassword) {
            setError('Passwords do not match');
            return;
        }

        try {
            const response = await axios.post('http://localhost:5000/register', data);
            alert(response.data);
        } catch (err) {
            if (err.response && err.response.data && err.response.data.message) {
                setError(err.response.data.message);
            } else {
                setError('An unexpected error occurred.');
            }
            console.error(err);
        }
    };

    return (
        <div className="register-container">
            <form onSubmit={submitHandler} className="register-form">
                <h2 className="form-title">Register</h2>
                {error && <p className="error-message">{error}</p>}
                <input
                    type="text"
                    onChange={changeHandler}
                    name="username"
                    placeholder="User Name"
                    value={data.username}
                    className="input-field"
                />
                <input
                    type="email"
                    onChange={changeHandler}
                    name="email"
                    placeholder="Email"
                    value={data.email}
                    className="input-field"
                />
                <input
                    type="password"
                    onChange={changeHandler}
                    name="password"
                    placeholder="Password"
                    value={data.password}
                    className="input-field"
                />
                <input
                    type="password"
                    onChange={changeHandler}
                    name="confirmpassword"
                    placeholder="Confirm Password"
                    value={data.confirmpassword}
                    className="input-field"
                />
                <button type="submit" className="submit-button">Register</button>
            </form>
        </div>
    );
};

export default Register;