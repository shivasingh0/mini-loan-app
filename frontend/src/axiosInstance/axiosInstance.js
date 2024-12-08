import axios from 'axios';

const axiosInstance = axios.create({
    // baseURL: 'http://localhost:5000/api',
    baseURL: "https://mini-loan-app-hrgl.onrender.com/api",
    headers: {
        'Content-Type': 'application/json',
    },
});

axiosInstance.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

export default axiosInstance;
