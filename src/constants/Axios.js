import axios from 'axios';
import * as SecureStore from 'expo-secure-store';

const Axios = axios.create({
  baseURL: 'http://192.168.236.49:7000/api/v1/',
  timeout: 1000,
  headers: {
    'Content-Type': 'application/json',
  },
});

Axios.interceptors.request.use((config) => {
  console.log('Request Headers:', config.headers);
  return config;
});

export const setTokenHeader = async () => {
  const token = await SecureStore.getItemAsync('token');
  Axios.interceptors.request.use((config) => {
    config.headers['x-access-token'] = token;
    return config;
  });
  console.log('Token set:', token);
};

setTokenHeader();

export default Axios;
