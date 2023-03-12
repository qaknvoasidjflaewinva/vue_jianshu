import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://127.0.0.1:5173/dev-api',
    withCredentials: true,
    timeout: 10 * 1000
});

export default instance;