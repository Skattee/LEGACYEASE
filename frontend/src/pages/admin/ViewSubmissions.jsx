import React, { useState, useEffect } from 'react';
import '../../styles/AdminTables.css';
import { fetchWithToken } from '../../utils/fetchWithToken';

const ViewSubmissions = () => {
    const [wills, setWills] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchWills = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await fetch('http://localhost:5000/api/wills', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                if (!response.ok) {
                    throw new Error(`Failed to fetch wills: ${response.status}`);
                }
                const data = await response.json();
                setWills(data);
            } catch (error) {
                console.error('Error fetching wills:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchWills();
    }, []);

    // Download the formatted Word file from backend
    const downloadWill = async (willId) => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(
                `http://localhost:5000/api/wills/${willId}/download`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            if (!response.ok) {
                throw new Error('Failed to download will');
            }
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `Will-${willId}.docx`;
            document.body.appendChild(a);
            a.click();
            a.remove();
            window.URL.revokeObjectURL(url);
        } catch (error) {
            alert('Error downloading will: ' + error.message);
        }
    };

    const approveWill = async (id) => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`http://localhost:5000/api/wills/${id}/approve`, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            if (!response.ok) {
                throw new Error(`Failed to approve will: ${response.status}`);
            }
            setWills(wills.filter((will) => will._id !== id));
        } catch (error) {
            console.error('Error approving will:', error);
        }
    };

    const declineWill = async (id) => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`http://localhost:5000/api/wills/${id}/decline`, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            if (!response.ok) {
                throw new Error(`Failed to decline will: ${response.status}`);
            }
            setWills(wills.filter((will) => will._id !== id));
        } catch (error) {
            console.error('Error declining will:', error);
        }
    };

    const filteredWills = wills.filter((will) =>
        will.user?.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        will._id.includes(searchTerm) ||
        will.status.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (loading) {
        return <p>Loading wills...</p>;
    }

    return (
        <div>
            <h1>View Submissions</h1>
            <input
                type="text"
                placeholder="Search by ID, email, or status"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
            />
            {filteredWills.length > 0 ? (
                <div className="admin-table-container">
                    <table className="admin-table">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Email</th>
                                <th>Date Created</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredWills.map((will, index) => (
                                <tr key={will._id || `${will.fullName}-${index}`}>
                                    <td>{will._id}</td>
                                    <td>{will.user?.email || 'N/A'}</td>
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
                                    <td>
                                        <button
                                            className="download-button"
                                            onClick={() => downloadWill(will._id)}
                                        >
                                            ⬇️ Download Will
                                        </button>
                                        <button
                                            className="approve-button"
                                            onClick={() => approveWill(will._id)}
                                        >
                                            ✅ Approve
                                        </button>
                                        <button
                                            className="decline-button"
                                            onClick={() => declineWill(will._id)}
                                        >
                                            ❌ Decline
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <p>No wills found.</p>
            )}
        </div>
    );
};

export default ViewSubmissions;