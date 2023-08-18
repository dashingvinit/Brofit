import React, { useState, useEffect, useMemo } from 'react';
import { StatusBar, View, SafeAreaView, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import * as SecureStore from 'expo-secure-store';
import { setTokenHeader } from './app/constants/Axios';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

import BottomNav from './app/constants/BottomNav';
import StackNav from './app/constants/StackNav';
import AdminNav from './app/constants/AdminNav';
import OwnerNav from './app/constants/OwnerNav';

SplashScreen.preventAutoHideAsync();

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState(null);

  setTokenHeader();

  const deleteItemFromSecureStore = async (key) => {
    try {
      await SecureStore.deleteItemAsync(key);
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
    getUser();
  }, []);

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

  const renderNavbarBasedOnRole = () => {
    if (userRole === 'owner') {
      SplashScreen.hideAsync();
      return <OwnerNav setHandleLogout={setHandleLogout} />;
    } else if (userRole === 'admin') {
      SplashScreen.hideAsync();
      return <AdminNav setHandleLogout={setHandleLogout} />;
    } else {
      SplashScreen.hideAsync();
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
