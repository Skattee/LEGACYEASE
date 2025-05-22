import React, { useState, useEffect } from 'react';
import '../styles/Profile.css';

const Profile = () => {
    const [email, setEmail] = useState('');
    const [fullName, setFullName] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) throw new Error('No token found');
                const response = await fetch(
                    `${process.env.REACT_APP_API_URL}/api/users/profile`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                if (!response.ok) throw new Error('Failed to fetch profile');
                const data = await response.json();
                setEmail(data.email || '');
                setFullName(data.fullName || '');
            } catch (error) {
                setEmail('Error loading profile');
                setFullName('');
            } finally {
                setLoading(false);
            }
        };
        fetchProfile();
    }, []);

    if (loading) return <p>Loading...</p>;

    return (
        <div className="profile-container">
            <h2>Your Profile</h2>
            <p><strong>Name:</strong> {fullName}</p>
            <p><strong>Email:</strong> {email}</p>
        </div>
    );
};

export default Profile;