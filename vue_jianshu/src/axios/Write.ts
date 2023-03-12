import axios from 'axios';
const instance = axios.create({
    baseURL: 'http://127.0.0.1:7001',
    withCredentials: true,
    timeout: 5 * 1000
});

export default instance;
