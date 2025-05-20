import axios from 'axios';

const API_URL = 'http://localhost:5000/api'; // Adjust the URL as needed

// Admin API calls
export const fetchSummary = async () => {
    const response = await axios.get(`${API_URL}/admin/summary`);
    return response.data;
};

export const fetchPendingAccounts = async () => {
    const response = await axios.get(`${API_URL}/admin/pending-accounts`);
    return response.data;
};

export const approveAccount = async (userId) => {
    const response = await axios.put(`${API_URL}/admin/approve-account/${userId}`);
    return response.data;
};

export const fetchRecentWills = async () => {
    const response = await axios.get(`${API_URL}/admin/recent-wills`);
    return response.data;
};

export const fetchPayments = async () => {
    const response = await axios.get(`${API_URL}/admin/payments`);
    return response.data;
};

export const sendWill = async (paymentId) => {
    const response = await axios.post(`${API_URL}/admin/send-will`, { paymentId });
    return response.data;
};

// Payment API calls
export const createPayment = async (paymentData) => {
    const response = await axios.post(`${API_URL}/payments/create`, paymentData);
    return response.data;
};

export const verifyPayment = async (paymentId) => {
    const response = await axios.post(`${API_URL}/payments/verify`, { paymentId });
    return response.data;
};

// Will API calls
export const fetchWillDetails = async (willId) => {
    const response = await axios.get(`${API_URL}/wills/${willId}`);
    return response.data;
};

export const downloadWill = async (willId) => {
    const response = await axios.get(`${API_URL}/wills/download/${willId}`, {
        responseType: 'blob',
    });
    return response.data;
};

// Fetch user profile
export const fetchUserProfile = async (userId) => {
    if (!userId) {
        throw new Error('User ID is required to fetch user profile');
    }
    const response = await axios.get(`http://localhost:5000/api/users/${userId}`);
    return response.data;
};

// Fetch user wills
export const fetchUserWills = async (userId) => {
    if (!userId) {
        throw new Error('User ID is required to fetch user wills');
    }
    const response = await axios.get(`http://localhost:5000/api/wills/user/${userId}`);
    return response.data;
};