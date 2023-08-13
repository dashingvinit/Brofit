import * as React from 'react';
import * as SecureStore from 'expo-secure-store';
import axios, { setTokenHeader } from './app/constants/Axios';
import { useState, useEffect, useMemo } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import BottomNav from './app/constants/BottomNav';
import StackNav from './app/constants/StackNav';
import AdminNav from './app/constants/AdminNav';
import OwnerNav from './app/constants/OwnerNav';
import { StatusBar,View,SafeAreaView,StyleSheet } from 'react-native';

function App() {
  // const linking = {
  //   prefixes: ['https://brofit.onrender.com', 'brofit://'],
  //   config: {
  //     screens: {},
  //   },
  // };

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState(null);

  setTokenHeader();

  const deleteItemFromSecureStore = async (key) => {
    try {
      await SecureStore.deleteItemAsync(key);
      // console.log('Item deleted successfully');
    } catch (error) {
      console.error('Failed to delete item:', error);
    }
  };

  const sethandleLogin = () => {
    setIsLoggedIn(true);
    getUser();
  };

  const setHandleLogout = () => {
    setIsLoggedIn(false);
  };

  const getToken = async () => {
    try {
      const token = await SecureStore.getItemAsync('token');
      const expire = await SecureStore.getItemAsync('expire');
      const expires = JSON.parse(expire);
      if (expires > Date.now() && token) {
        // console.log('Token:', token);
        setIsLoggedIn(true);
      } else {
        // console.log('Token is expired or user is not logged in');
        setIsLoggedIn(false);
        deleteItemFromSecureStore('token');
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getUser = async () => {
    try {
      const user = await SecureStore.getItemAsync('user');
      const userObj = JSON.parse(user);
      const userRole = userObj?.role;
      setUserRole(userRole);
      //  console.log('Role:', userRole);
      // console.log('User:', userObj);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getToken();
    getUser();
  }, []);

  const renderNavbarBasedOnRole = () => {
    if (userRole === 'owner') {
      return <OwnerNav setHandleLogout={setHandleLogout} />;
    } else if (userRole === 'admin') {
      return <AdminNav setHandleLogout={setHandleLogout} />;
    } else {
      return <BottomNav setHandleLogout={setHandleLogout} />;
    }
  };

  const navbar = useMemo(() => renderNavbarBasedOnRole(), [userRole]);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="light-content" 
      />
      <NavigationContainer>
        <View style={styles.content}>
        {isLoggedIn ? navbar : <StackNav sethandleLogin={sethandleLogin} />}
        </View>
      </NavigationContainer>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
});

export default App;
