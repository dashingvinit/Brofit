import React, { useState, useEffect, useMemo } from 'react';
import { StatusBar, View, StyleSheet, Platform } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import * as SecureStore from 'expo-secure-store';
import { setTokenHeader } from './app/constants/Axios';
import * as SplashScreen from 'expo-splash-screen';

import {
  UserNav,
  StackNav,
  AdminNav,
  OwnerNav,
} from './app/navigation/index.js';

SplashScreen.preventAutoHideAsync();

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // state to check if user is logged in
  const [userRole, setUserRole] = useState(null); // state to check user role

  setTokenHeader();

  // calls getToken and getUser on initial render
  useEffect(() => {
    getToken();
    getUser();
  }, []);

  // Function to delete item from secure store
  const deleteItemFromSecureStore = async (key) => {
    try {
      await SecureStore.deleteItemAsync(key);
    } catch (error) {
      console.error('Failed to delete item:', error);
    }
  };

  // sets the isLoggedIn state to true and calls getUser
  // --> this is passed to the StackNav component
  const sethandleLogin = () => {
    setIsLoggedIn(true);
    getUser();
  };

  // sets the isLoggedIn state to false
  // --> this is passed to the OwnerNav, AdminNav, and UserNav components
  const setHandleLogout = () => {
    setIsLoggedIn(false);
  };

  // gets the token and expire from secure store and checks if the token is expired
  // --> if the token is expired, it deletes the token from secure store
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

  // gets the user role and sets it to the userRole state
  const getUser = async () => {
    try {
      const user = await SecureStore.getItemAsync('user');
      const userObj = JSON.parse(user);
      const userRole = userObj?.role ?? 'undefined';
      setUserRole(userRole);
    } catch (error) {
      console.log(error);
    }
  };

  //Render navbar based on user role we get from getUser
  const renderNavbarBasedOnRole = () => {
    if (userRole === 'owner') {
      SplashScreen.hideAsync();
      return <OwnerNav setHandleLogout={setHandleLogout} />;
    } else if (userRole === 'admin') {
      SplashScreen.hideAsync();
      return <AdminNav setHandleLogout={setHandleLogout} />;
    } else {
      SplashScreen.hideAsync();
      return <UserNav setHandleLogout={setHandleLogout} />;
    }
  };

  const navbar = useMemo(() => renderNavbarBasedOnRole(), [userRole]);

  return (
    <View style={styles.container}>
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'ios' ? StatusBar.currentHeight : 0, // Add padding to shift content below the status bar
    paddingBottom: Platform.OS === 'ios' ? 0 : 0, // Add padding to shift content above the bottom bar (tab bar)
    backgroundColor: 'transparent', // Make the status bar and bottom bar (tab bar) transparent
  },
  content: {
    flex: 1,
  },
});

export default App;
