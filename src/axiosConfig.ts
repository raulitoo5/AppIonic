import axios from "axios";
import { useJwt } from "react-jwt";

const apiClient = axios.create({
    baseURL: 'https://dummyjson.com',
    timeout: 10000, // Tiempo máximo de espera de 10 segundos
});

apiClient.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token') || '';

        if(token){
            config.headers['Authorization'] = `Bearer ${token}`;
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default apiClient;

