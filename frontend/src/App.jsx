import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useLocation, useNavigate } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import Login from './components/Login';
import Register from './components/Register';
import AdminDashboard from './pages/AdminDashboard';
import UserDashboard from './components/UserDashboard';
import SubmitWill from './components/SubmitWill';
import Profile from './components/Profile';
import DashboardOverview from './pages/admin/DashboardOverview';
import ManageUsers from './pages/admin/ManageUsers';
import ViewSubmissions from './pages/admin/ViewSubmissions';
import CreateAdmin from './pages/admin/CreateAdmin';
import Layout from './components/Layout';
import AdminProfile from './pages/admin/AdminProfile';

function useAutoLogout() {
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            try {
                const payload = JSON.parse(atob(token.split('.')[1]));
                const now = Math.floor(Date.now() / 1000);
                if (payload.exp && payload.exp < now) {
                    localStorage.removeItem('token');
                    navigate('/login', { replace: true });
                }
            } catch (e) {
                localStorage.removeItem('token');
                navigate('/login', { replace: true });
            }
        }
    }, [location, navigate]);
}

const App = () => {
    useAutoLogout();
    const [loading, setLoading] = useState(true);
    const [isAdmin, setIsAdmin] = useState(false);
    const [isUser, setIsUser] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            try {
                const decodedToken = JSON.parse(atob(token.split('.')[1]));
                setIsAdmin(!!decodedToken.isAdmin);
                setIsUser(!decodedToken.isAdmin);
            } catch (error) {
                setIsAdmin(false);
                setIsUser(false);
                localStorage.removeItem('token');
            }
        } else {
            setIsAdmin(false);
            setIsUser(false);
        }
        setLoading(false);
    }, []);

    if (loading) {
        return (
            <div className="loading-container">
                <p>Loading...</p>
            </div>
        );
    }

    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route index element={<LandingPage />} />
                <Route path="login" element={<Login />} />
                <Route path="register" element={<Register />} />
                <Route
                    path="dashboard"
                    element={
                        isAdmin ? (
                            <Navigate to="/admin" />
                        ) : isUser ? (
                            <Navigate to="/user" />
                        ) : (
                            <Navigate to="/login" />
                        )
                    }
                />
                <Route
                    path="user"
                    element={isUser ? <UserDashboard /> : <Navigate to="/login" />}
                >
                    <Route path="submit-will" element={<SubmitWill />} />
                    <Route path="profile" element={<Profile />} />
                </Route>
                <Route path="admin" element={<AdminDashboard />}>
                    <Route index element={<DashboardOverview />} />
                    <Route path="manage-users" element={<ManageUsers />} />
                    <Route path="view-submissions" element={<ViewSubmissions />} />
                    <Route path="create-admin" element={<CreateAdmin />} />
                    <Route path="profile" element={<AdminProfile />} />
                </Route>
            </Route>
        </Routes>
    );
};

export default App;