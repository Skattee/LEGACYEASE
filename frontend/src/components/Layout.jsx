import React from 'react';
import { Outlet } from 'react-router-dom';
import '../styles/Layout.css'; // Add custom styles if needed

const Layout = () => {
    return (
        <div className="layout">
            <header className="layout-header">
                <h1 className="layout-title">LEGACYEASE</h1>
            </header>
            <main className="layout-content">
                <Outlet />
            </main>
        </div>
    );
};

export default Layout;