import axios from 'axios';

const followOff = axios.create({
    baseURL: 'http://127.0.0.1:7001',
    withCredentials: true,
});

export default followOff;