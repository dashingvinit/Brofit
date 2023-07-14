import * as React from 'react';
import * as SecureStore from 'expo-secure-store';
import axios, { setTokenHeader } from './src/constants/Axios';
import { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import BottomNav from './src/constants/BottomNav';
import StackNav from './src/constants/StackNav';
import OwnerNav from './src/constants/OwnerNav';

// import styles from './src/components/home/popular/popularjobs.style'

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const sethandleLogin = () => {
    setIsLoggedIn(true);
  };

  const deleteItemFromSecureStore = async (key) => {
    try {
      await SecureStore.deleteItemAsync(key);
      console.log('Item deleted successfully');
    } catch (error) {
      console.error('Failed to delete item:', error);
    }
  };
  setTokenHeader();
  const getToken = async () => {
    try {
      const token = await SecureStore.getItemAsync('token');
      const expire = await SecureStore.getItemAsync('expire');
      const expires = JSON.parse(expire);
      if (expires > Date.now() && token) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
        deleteItemFromSecureStore('token');
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getToken();
  }, []);

  return (
    <NavigationContainer>
      {isLoggedIn ? (
        <BottomNav />
      ) : (
        <StackNav sethandleLogin={sethandleLogin} />
      )}
    </NavigationContainer>
  );
}

export default App;
