import axios from 'axios';

const API_URL = 'http://localhost:5000/api/auth'; // Adjust the URL as needed

// Function to handle user login
export const login = async (email, password) => {
    try {
        const response = await axios.post(`${API_URL}/login`, { email, password });
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

// Function to handle user registration
export const register = async (userData) => {
    try {
        const response = await axios.post(`${API_URL}/register`, userData);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

// Function to get the current user's profile
export const getProfile = async (token) => {
    try {
        const response = await axios.get(`${API_URL}/profile`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};