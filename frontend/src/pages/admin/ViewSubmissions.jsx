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

    const downloadWill = (will) => {
        const willContent = `
            Will ID: ${will._id}
            Full Name: ${will.fullName}
            Also Known As: ${will.alsoKnownAs || 'N/A'}
            Omang Number: ${will.omangNumber}
            Address: ${will.address}
            Phone Number: ${will.phoneNumber}
            Date of Birth: ${will.dateOfBirth}
            Marital Status: ${will.maritalStatus}
            Spouse Name: ${will.spouseName || 'N/A'}
            Spouse Address: ${will.spouseAddress || 'N/A'}
            Spouse Date of Birth: ${will.spouseDateOfBirth || 'N/A'}
            Spouse Omang Number: ${will.spouseOmangNumber || 'N/A'}
            Children Info: ${will.childrenInfo || 'N/A'}
            More Children: ${will.moreChildren || 'N/A'}
            Real Estate Info: ${will.realEstateInfo || 'N/A'}
            Executor Name: ${will.executorName}
            Executor Address: ${will.executorAddress}
            Executor Relationship: ${will.executorRelationship}
            Title: ${will.title}
            Content: ${will.content}
            Status: ${will.status}
            Created At: ${new Date(will.createdAt).toLocaleDateString()}
        `;

        const blob = new Blob([willContent], { type: 'application/msword' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = `Will-${will._id}.doc`;
        link.click();
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
            console.log(`Will with ID ${id} approved.`);
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
            console.log(`Will with ID ${id} declined.`);
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
                                            onClick={() => downloadWill(will)}
                                        >
                                            📥 Download
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