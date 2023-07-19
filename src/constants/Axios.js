import axios from 'axios';
import * as SecureStore from 'expo-secure-store';

const Axios = axios.create({
  baseURL: 'http://192.168.29.211:7000/api/v1/',
  timeout: 5000, // Adjust the timeout as needed
});

// Function to retrieve the token from SecureStore
async function getTokenFromSecureStore() {
  try {
    const token = await SecureStore.getItemAsync('token');
    return token;
  } catch (error) {
    console.error('Error retrieving token:', error);
    return null;
  }
}

// Register the request interceptor once during app initialization
Axios.interceptors.request.use(async (config) => {
  const token = await getTokenFromSecureStore();
  if (token) {
    config.headers['x-access-token'] = token;
    // console.log('Token set:', token);
  }
  return config;
});

export function setTokenHeader() {
  // Optional: You can update the token in SecureStore here
  // return a Promise here
  return new Promise((resolve, reject) => {
    Axios.interceptors.request.eject(0);
    Axios.interceptors.request.use(async (config) => {
      const token = await getTokenFromSecureStore();
      if (token) {
        config.headers['x-access-token'] = token;
        // console.log('Token set:', token);
      }
      return config;
    });
    resolve();
  });
}

Axios.interceptors.request.use((config) => {
  console.log('Request Headers:', config.headers);
  return config;
});

export default Axios;
