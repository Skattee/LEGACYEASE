import React, { useState, useEffect } from 'react';
import ReactPaginate from 'react-paginate';
import '../../styles/AdminTables.css';
import LoadingSpinner from '../../components/LoadingSpinner'; // Import the spinner

const ManageUsers = () => {
    const [users, setUsers] = useState([]);
    const [pendingUsers, setPendingUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(0);
    const itemsPerPage = 10;

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await fetch(`${process.env.REACT_APP_API_URL}/api/users`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                if (!response.ok) {
                    throw new Error(`Failed to fetch users: ${response.status}`);
                }
                const data = await response.json();
                setUsers(data);
                setPendingUsers(data.filter((user) => !user.isApproved)); // Pending users
            } catch (error) {
                console.error('Error fetching users:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);

    const approveUser = async (userId) => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`${process.env.REACT_APP_API_URL}/api/admin/${userId}/approve`, {
                method: 'PUT',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                throw new Error(`Failed to approve user: ${response.status}`);
            }

            const data = await response.json();
            console.log('User approved successfully:', data);
        } catch (error) {
            console.error('Error approving user:', error);
        }
    };

    const deleteUser = async (id) => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`${process.env.REACT_APP_API_URL}/api/users/${id}`, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            if (!response.ok) {
                throw new Error(`Failed to delete user: ${response.status}`);
            }
            console.log(`User with ID ${id} deleted.`);
            setUsers(users.filter((user) => user._id !== id)); // Remove the user from the list
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    };

    const handlePageClick = (event) => {
        setCurrentPage(event.selected);
    };

    const displayedUsers = users.slice(
        currentPage * itemsPerPage,
        (currentPage + 1) * itemsPerPage
    );

    if (loading) {
        return <LoadingSpinner message="Loading users..." />; // Use the spinner here
    }

    return (
        <div>
            <h1>Manage Users</h1>

            {/* Pending Accounts Table */}
            <h2>Pending Accounts</h2>
            {pendingUsers.length > 0 ? (
                <table className="admin-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {pendingUsers.map((user) => (
                            <tr key={user._id}>
                                <td>{user._id}</td>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>
                                    <button
                                        className="approve-button"
                                        onClick={() => approveUser(user._id)}
                                    >
                                        ✅ Approve
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>No pending accounts.</p>
            )}

            {/* All Users Table */}
            <h2>All Users</h2>
            {users.length > 0 ? (
                <table className="admin-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {displayedUsers.map((user) => (
                            <tr key={user._id}>
                                <td>{user._id}</td>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{user.isAdmin ? 'Admin' : 'User'}</td>
                                <td>
                                    <button
                                        className="delete-button"
                                        onClick={() => deleteUser(user._id)}
                                    >
                                        ❌ Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>No users found.</p>
            )}
            <ReactPaginate
                previousLabel={'← Previous'}
                nextLabel={'Next →'}
                pageCount={Math.ceil(users.length / itemsPerPage)}
                onPageChange={handlePageClick}
                containerClassName={'pagination'}
                activeClassName={'active'}
            />
        </div>
    );
};

export default ManageUsers;