import { View, Text, Image } from 'react-native';
import React, { useState, useEffect } from 'react';
import * as SecureStore from 'expo-secure-store';
import Btn from './Btn';
import { bgColor, neon } from '../constants/Constants';

const Top = (props) => {
  const [name, setName] = useState('User');

  const getUser = async () => {
    const userObject = await SecureStore.getItemAsync('user');
    if (!userObject) return;
    try {
      const user = JSON.parse(userObject);
      setName(user.name);
    } catch (error) {
      console.log(error);
    }
  };

  const handleLogout = async () => {
    try {
      await SecureStore.deleteItemAsync('token');
      alert('token deleted using top logout button');
      console.log('token deelted');
      props.navigation.navigate('Welcome');
    } catch (error) {
      console.error('error', error);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        margin: 10,
        paddingTop: 40,
      }}>
      <Image
        source={require('../assets/images/profile.jpg')}
        style={{ width: 65, height: 65, borderRadius: 50, marginRight: 10 }}
      />
      <View>
        <Text
          style={{
            fontSize: 12,
            fontWeight: 'bold',
            color: 'white',
          }}>
          Welcome Back
        </Text>
        <Text style={{ fontSize: 24, fontWeight: 'bold', color: 'white' }}>
          {name}
        </Text>
      </View>
      <Btn
        bgColor={bgColor}
        textColor={neon}
        btnLabel="Logout"
        Press={handleLogout}
      />
    </View>
  );
};

export default Top;
