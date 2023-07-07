import axios from 'axios';
import * as SecureStore from 'expo-secure-store';

const Axios = axios.create({
  baseURL: 'http://192.168.0.113:7000/api/v1/',
  headers: {
    'Content-Type': 'application/json',
  },
});

const setTokenHeader = async () => {
  try {
    const token = await SecureStore.getItemAsync('token');
    Axios.interceptors.request.use((config) => {
      config.headers['x-access-token'] = token;
      return config;
    });
    console.log('Token set:', token);
  } catch (error) {
    if (error.code === 'ENOENT') {
      Axios.interceptors.request.use((config) => {
        delete config.headers['x-access-token'];
        return config;
      });
    } else {
      throw error;
    }
  }
};

setTokenHeader();

// Axios.interceptors.request.use((config) => {
//   console.log('Request Headers:', config.headers);
//   return config;
// });

export default Axios;
