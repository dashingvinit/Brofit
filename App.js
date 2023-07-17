import * as React from 'react';
import * as SecureStore from 'expo-secure-store';
import axios, { setTokenHeader } from './src/constants/Axios';
import { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import BottomNav from './src/constants/BottomNav';
import StackNav from './src/constants/StackNav';
import AdminNav from './src/constants/AdminNav';
import OwnerNav from './src/constants/OwnerNav';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [role, setRole] = useState('');

  setTokenHeader();

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

  const sethandleLogin = () => {
    setIsLoggedIn(true);
  };

  const sethandleLogout = () => {
    setIsLoggedIn(false);
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
    getToken();
    getUser();
  }, []);

  const renderNavbarBasedOnRole = () => {
    getUser();
    if (role === 'owner') {
      return <OwnerNav />;
    } else if (role === 'admin') {
      return <AdminNav />;
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
