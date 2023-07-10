import { View, Text, Image } from 'react-native';
import React, { useState, useEffect } from 'react';
import * as SecureStore from 'expo-secure-store';

const Top = () => {
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
        source={require('../assets/images/timerback.jpg')}
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
    </View>
  );
};

export default Top;
