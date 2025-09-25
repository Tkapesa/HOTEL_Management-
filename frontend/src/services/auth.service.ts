import axios from 'axios';

const API_URL = 'http://localhost:3001/api/v1/auth/';

const register = async (firstName, lastName, email, password) => {
    const response = await axios.post(API_URL + 'register', {
        firstName,
        lastName,
        email,
        password,
    });
    return response.data;
};

const registerUser = async (userData) => {
    const response = await axios.post(API_URL + 'register', userData);
    return response.data;
};

const login = async (email, password) => {
    const response = await axios.post(API_URL + 'login', {
        email,
        password,
    });
    if (response.data.data && response.data.data.tokens) {
        localStorage.setItem('user', JSON.stringify(response.data.data));
    }
    return response.data;
};

const logout = () => {
    localStorage.removeItem('user');
};

const getCurrentUser = () => {
    return JSON.parse(localStorage.getItem('user'));
};

const getAuthToken = () => {
    const user = getCurrentUser();
    return user?.tokens?.accessToken || null;
};

// Set up axios interceptor for authentication
axios.interceptors.request.use(
    (config) => {
        const token = getAuthToken();
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Default export for compatibility
export default {
    register,
    registerUser,
    login,
    logout,
    getCurrentUser,
    getAuthToken,
};

// Named exports for components that expect them
export { register, registerUser, login, logout, getCurrentUser, getAuthToken };