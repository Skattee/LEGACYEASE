import React, { useState, useEffect } from 'react';
import LoadingSpinner from '../../components/LoadingSpinner';
import '../../styles/DashboardOverview.css';
import { FaFileAlt, FaCheckCircle, FaHourglassHalf, FaUserClock } from 'react-icons/fa';

const DashboardOverview = () => {
    const [stats, setStats] = useState({
        totalWills: 0,
        approvedWills: 0,
        pendingWills: 0,
        pendingAccounts: 0,
    });
    const [loading, setLoading] = useState(true);
    const [adminName, setAdminName] = useState('');

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const token = localStorage.getItem('token');

                // Fetch wills stats
                const willsResponse = await fetch(
                    `${process.env.REACT_APP_API_URL}/api/admin/wills/stats`,
                    { headers: { Authorization: `Bearer ${token}` } }
                );
                if (!willsResponse.ok) throw new Error(`Failed to fetch wills stats: ${willsResponse.status}`);
                const willsData = await willsResponse.json();

                // Fetch pending accounts stats
                const accountsResponse = await fetch(
                    `${process.env.REACT_APP_API_URL}/api/admin/accounts/stats`,
                    { headers: { Authorization: `Bearer ${token}` } }
                );
                if (!accountsResponse.ok) throw new Error(`Failed to fetch accounts stats: ${accountsResponse.status}`);
                const accountsData = await accountsResponse.json();

                // Fetch admin profile for welcome message
                const profileResponse = await fetch(
                    `${process.env.REACT_APP_API_URL}/api/admin/profile`,
                    { headers: { Authorization: `Bearer ${token}` } }
                );
                let profileData = {};
                if (profileResponse.ok) {
                    profileData = await profileResponse.json();
                }

                setStats({
                    ...willsData,
                    pendingAccounts: accountsData.pendingAccounts,
                });
                setAdminName(profileData.fullName || 'Admin');
            } catch (error) {
                console.error('Error fetching stats:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchStats();
    }, []);

    if (loading) {
        return <LoadingSpinner message="Loading dashboard overview..." />;
    }

    return (
        <div className="dashboard-overview">
            <h1 className="mb-4">Welcome back, <span className="text-primary">{adminName}</span>!</h1>
            <div className="cards-container">
                <div className="card dashboard-card">
                    <FaFileAlt className="dashboard-icon text-info" />
                    <h2>Total Wills</h2>
                    <p>{stats.totalWills}</p>
                </div>
                <div className="card dashboard-card">
                    <FaCheckCircle className="dashboard-icon text-success" />
                    <h2>Approved Wills</h2>
                    <p>{stats.approvedWills}</p>
                </div>
                <div className="card dashboard-card">
                    <FaHourglassHalf className="dashboard-icon text-warning" />
                    <h2>Pending Wills</h2>
                    <p>{stats.pendingWills}</p>
                </div>
                <div className="card dashboard-card">
                    <FaUserClock className="dashboard-icon text-danger" />
                    <h2>Pending Accounts</h2>
                    <p>{stats.pendingAccounts}</p>
                </div>
            </div>
            <div className="mt-5">
                <h4>Quick Actions</h4>
                <div className="quick-actions">
                    <a href="/admin/manage-users" className="btn btn-outline-primary m-2">Manage Users</a>
                    <a href="/admin/view-submissions" className="btn btn-outline-info m-2">View Submissions</a>
                    <a href="/admin/create-admin" className="btn btn-outline-success m-2">Create Admin</a>
                </div>
            </div>
        </div>
    );
};

export default DashboardOverview;