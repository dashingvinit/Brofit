import * as React from 'react';
import * as SecureStore from 'expo-secure-store';

import { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import BottomNav from './src/constants/BottomNav';
import StackNav from './src/constants/StackNav';

// import styles from './src/components/home/popular/popularjobs.style'

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const deleteItemFromSecureStore = async (key) => {
    try {
      await SecureStore.deleteItemAsync(key);
      console.log('Item deleted successfully');
    } catch (error) {
      console.error('Failed to delete item:', error);
    }
  };

  const getToken = async () => {
    try {
      const token = await SecureStore.getItemAsync('token');
      const expire = await SecureStore.getItemAsync('expire');
      if (expire > Date.now() && token) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
        deleteItemFromSecureStore('token');
      }
    } catch (error) {
      console.log(error);
    }
  };

  const sethandleLogin = () => {
    setIsLoggedIn(true);
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
