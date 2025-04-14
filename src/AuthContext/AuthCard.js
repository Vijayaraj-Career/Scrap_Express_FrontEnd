import axios from "axios";
 
// Create instance
const axiosInstance = axios.create({
    baseURL: "http://localhost:8000/app/v1", // Your API base URL
});


 
// Function to attach interceptors
export const setupInterceptors = (token) => {
    // Request interceptor to add token
    axiosInstance.interceptors.request.use(
        (config) => {
            console.log("config",config);
            if (token) {
                config.headers['Authorization'] = `Bearer ${token}`;
            }
            return config;
        },
        (error) => {
            return Promise.reject(error);
        }
    );
 
    // Optional: Response interceptor to catch errors globally
    axiosInstance.interceptors.response.use(
        (response) => response,
        (error) => {
            // Handle unauthorized, token expired, etc.
            if (error.response && error.response.status === 401) {
                console.log("Unauthorized! Please log in again.");
            }
            return Promise.reject(error);
        }
    );
};
 
export default axiosInstance;