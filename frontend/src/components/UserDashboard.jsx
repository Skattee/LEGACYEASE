import React, { useState, useEffect } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import '../styles/UserDashboard.css'; // Add custom styles
import logo from '../assets/logo.png'; // Import the logo

const UserDashboard = () => {
    const [wills, setWills] = useState([]);
    const [loading, setLoading] = useState(true);
    const location = useLocation(); // Get the current route

    useEffect(() => {
        const fetchUserWills = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await fetch(
                    `${process.env.REACT_APP_API_URL}/api/user/wills`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                if (!response.ok) {
                    throw new Error(`Failed to fetch user wills: ${response.status}`);
                }
                const data = await response.json();
                setWills(data);
            } catch (error) {
                console.error('Error fetching user wills:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchUserWills();
    }, []);

    const logout = () => {
        localStorage.removeItem('token'); // Clear the token
        window.location.href = '/login'; // Redirect to login page
    };

    if (loading) {
        return <p>Loading your wills...</p>;
    }

    return (
        <div className="dashboard-container">
            {/* Sidebar */}
            <aside className="sidebar">
                <div className="sidebar-header">
                    <img src={logo} alt="LEGACYEASE Logo" className="sidebar-logo" />
                </div>
                <ul className="nav">
                    <li className="nav-item">
                        <Link to="/user" className="nav-link">🏠 Dashboard</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/user/submit-will" className="nav-link">📝 Submit a Will</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/user/profile" className="nav-link">👤 Profile</Link>
                    </li>
                    <li className="nav-item">
                        <button className="nav-link logout-button" onClick={logout}>🚪 Logout</button>
                    </li>
                </ul>
            </aside>

            {/* Main Content */}
            <div className="user-dashboard">
                <div className="main-content">
                    {/* Show Status Explanation and Table only on the Dashboard route */}
                    {location.pathname === '/user' && (
                        <>
                            <div className="status-info">
                                <p><strong>Status Information:</strong></p>
                                <ul>
                                    <li><strong>Pending:</strong> Your will is under review by the admin.</li>
                                    <li><strong>Approved:</strong> Your will has been reviewed and approved.</li>
                                    <li><strong>Declined:</strong> Your will has been reviewed and declined by the admin.</li>
                                </ul>
                            </div>

                            {/* Status Table */}
                            <h2>Your Submitted Wills</h2>
                            {wills.length > 0 ? (
                                <table className="user-table">
                                    <thead>
                                        <tr>
                                            <th>ID</th>
                                            <th>Date Created</th>
                                            <th>Status</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {wills.map((will) => (
                                            <tr key={will._id}>
                                                <td>{will._id}</td>
                                                <td>
                                                    {will.createdAt
                                                        ? new Date(will.createdAt).toLocaleDateString()
                                                        : 'N/A'}
                                                </td>
                                                <td
                                                    className={
                                                        will.status === 'Approved'
                                                            ? 'status-approved'
                                                            : will.status === 'Declined'
                                                            ? 'status-declined'
                                                            : 'status-pending'
                                                    }
                                                >
                                                    {will.status}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            ) : (
                                <p>You have not submitted any wills yet.</p>
                            )}
                        </>
                    )}

                    <Outlet /> {/* This will render the child routes */}
                </div>
            </div>
        </div>
    );
};

export default UserDashboard;