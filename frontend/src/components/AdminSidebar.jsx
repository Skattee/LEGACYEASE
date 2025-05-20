import React from 'react';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, Typography } from '@mui/material';

import { Dashboard, Group, Assignment, Add, Logout, AccountCircle } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png'; // Add your logo file here
import '../styles/AdminSidebar.css';

const AdminSidebar = () => {
    return (
        <Drawer
            variant="permanent"
            sx={{
                width: 250,
                flexShrink: 0,
                '& .MuiDrawer-paper': {
                    width: 250,
                    boxSizing: 'border-box',
                    backgroundColor: '#007bff',
                    color: '#ffffff',
                },
            }}
        >
            <div style={{ textAlign: 'center', padding: '20px' }}>
                <img src={logo} alt="Logo" style={{ width: '100px', marginBottom: '10px' }} />
                <Typography variant="h6" style={{ color: '#ffffff' }}>
                    Admin Panel
                </Typography>
            </div>
            <List>
                <ListItem button>
                    {/* Content */}
                </ListItem>
                <ListItem button component={Link} to="/admin">
                    <ListItemIcon>
                        <Dashboard sx={{ color: '#ffffff' }} />
                    </ListItemIcon>
                    <ListItemText primary="Dashboard" />
                </ListItem>
                <ListItem button component={Link} to="/admin/manage-users">
                    <ListItemIcon>
                        <Group sx={{ color: '#ffffff' }} />
                    </ListItemIcon>
                    <ListItemText primary="Manage Users" />
                </ListItem>
                <ListItem button component={Link} to="/admin/view-submissions">
                    <ListItemIcon>
                        <Assignment sx={{ color: '#ffffff' }} />
                    </ListItemIcon>
                    <ListItemText primary="View Submissions" />
                </ListItem>
                <ListItem button component={Link} to="/admin/create-admin">
                    <ListItemIcon>
                        <Add sx={{ color: '#ffffff' }} />
                    </ListItemIcon>
                    <ListItemText primary="Create Admin" />
                </ListItem>
                <ListItem button component={Link} to="/admin/profile">
                    <ListItemIcon>
                        <AccountCircle sx={{ color: '#ffffff' }} />
                    </ListItemIcon>
                    <ListItemText primary="Profile" />
                </ListItem>
                <ListItem button component={Link} to="/login">
                    <ListItemIcon>
                        <Logout sx={{ color: '#ffffff' }} />
                    </ListItemIcon>
                    <ListItemText primary="Logout" />
                </ListItem>
            </List>
        </Drawer>
    );
};

export default AdminSidebar;