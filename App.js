import * as React from 'react';
import * as SecureStore from 'expo-secure-store';
import axios, { setTokenHeader } from './src/constants/Axios';
import { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import BottomNav from './src/constants/BottomNav';
import StackNav from './src/constants/StackNav';
import OwnerNav from './src/constants/OwnerNav';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [role, setRole] = useState('');

  const sethandleLogin = () => {
    setIsLoggedIn(true);
  };

  const getUser = async () => {
    try {
      const user = await SecureStore.getItemAsync('user');
      const userObj = JSON.parse(user);
      const userRole = userObj.role;
      setRole(userRole);
      console.log('Role:', userRole);
      console.log('User:', userObj);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

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

  const renderNavbarBasedOnRole = () => {
    if (role === 'owner') {
      return <OwnerNav />;
    } else if (role === 'admin') {
      return <BottomNav />;
      // Render AdminNav component
      // Replace with the component you want to render for the admin role
      return null;
    } else {
      return <BottomNav />;
    }
  };

  return (
    <NavigationContainer>
      {isLoggedIn ? (
        renderNavbarBasedOnRole()
      ) : (
        <StackNav sethandleLogin={sethandleLogin} />
      )}
    </NavigationContainer>
  );
}

export default App;
