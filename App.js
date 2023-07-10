import * as React from 'react';
import * as SecureStore from 'expo-secure-store';
import { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import BottomNav from './src/constants/BottomNav';
import StackNav from './src/constants/StackNav';

// import styles from './src/components/home/popular/popularjobs.style'

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const getToken = async () => {
    const token = await SecureStore.getItemAsync('token');
    if (token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
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
