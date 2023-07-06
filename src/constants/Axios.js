import axios from 'axios';

// const token = localStorage.getItem('token');

const Axios = axios.create({
  baseURL: 'http://192.168.0.130:7000/api/v1/',
  timeout: 1000,
  headers: {
    'Content-Type': 'application/json',
  },
});

Axios.defaults.headers.common['Authorization'] = 'token';

export default Axios;
