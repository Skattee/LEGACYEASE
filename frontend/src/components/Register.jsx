import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/Register.css';
import logo from '../assets/logo.png'; // Adjust the path if your logo is elsewhere

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(
                `${process.env.REACT_APP_API_URL}/api/auth/register`,
                { name, email, password }
            );
            setSuccess('Registration successful! You can now log in.');
            setError('');
            setTimeout(() => navigate('/login'), 2000);
        } catch (err) {
            setError(err.response?.data?.message || 'Registration failed. Please try again.');
            setSuccess('');
        }
    };

    return (
        <div className="register-container">
            <div className="register-card">
                <img src={logo} alt="LegacyEase Logo" className="auth-logo" />
                <h2>Register</h2>
                {error && <p className="error">{error}</p>}
                {success && <p className="success">{success}</p>}
                <form onSubmit={handleRegister}>
                    <input
                        type="text"
                        placeholder="Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <button type="submit">Register</button>
                </form>
                <p>
                    Already have an account? <a href="/login">Login here</a>
                </p>
                <p>
                    <Link to="/">Back to Home</Link>
                </p>
            </div>
        </div>
    );
};

export default Register;