import React from 'react';
import AdminSidebar from '../components/AdminSidebar';
import { Outlet } from 'react-router-dom';
import '../styles/AdminDashboard.css';

const AdminDashboard = () => {
    return (
        <div className="admin-dashboard">
            <AdminSidebar />
            <div className="admin-content">
                <Outlet />
            </div>
        </div>
    );
};

export default AdminDashboard;