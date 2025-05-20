import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import '../styles/Login.css';
import logo from '../assets/logo.png'; // Adjust the path if your logo is elsewhere

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');
        try {
            const response = await fetch('http://localhost:5000/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (!response.ok) {
                setError(data.message || 'Invalid credentials');
                console.log('Login failed:', data.message);
                return;
            }

            const { accessToken } = data;
            if (accessToken) {
                localStorage.setItem('token', accessToken);
                let decodedToken = null;
                try {
                    decodedToken = JSON.parse(atob(accessToken.split('.')[1]));
                    console.log('Decoded token:', decodedToken);
                } catch (err) {
                    setError('Invalid token received.');
                    console.log('Token decode error:', err);
                    return;
                }

                if (decodedToken.isAdmin) {
                    console.log('Redirecting to /admin');
                    navigate('/admin');
                } else {
                    console.log('Redirecting to /user');
                    navigate('/user');
                }
            } else {
                console.log('No token in response:', data);
                setError('No token received from server.');
            }
        } catch (error) {
            setError(error.message || 'Error logging in. Please try again.');
            console.error('Error logging in:', error);
        }
    };

    return (
        <div className="login-container">
            <div className="login-card">
                <img src={logo} alt="LegacyEase Logo" className="auth-logo" />
                <h2>Login</h2>
                {error && <p className="error">{error}</p>}
                <form onSubmit={handleLogin}>
                    <div>
                        <label>Email:</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label>Password:</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            autoComplete="current-password"
                        />
                    </div>
                    <button type="submit">Login</button>
                </form>
                <p>
                    Don't have an account? <Link to="/register">Register here</Link>
                </p>
                <p>
                    <Link to="/">Back to Home</Link>
                </p>
            </div>
        </div>
    );
};

export default Login;