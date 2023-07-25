import { View, Text, Image, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';
import * as SecureStore from 'expo-secure-store';
import EBtn from './ExitButton';
import { bgColor, bgLight, neon, offWhite } from '../constants/Constants';
import Ionicons from 'react-native-vector-icons/Ionicons';

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
      // alert('token deleted ');
      console.log('Token deleted');
      props.setHandleLogout();
      props.navigation.navigate('Welcome');
    } catch (error) {
      alert('error');
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
        justifyContent: 'space-between',
        margin: 10,
        paddingTop: 10,
      }}>
      <View
        style={{ flexDirection: 'row', alignItems: 'center', paddingTop: 20 }}>
        <TouchableOpacity
          onPress={() => props.navigation.navigate('ProfilePage')}>
          <Image
            source={require('../assets/images/profile.jpg')}
            style={{ width: 65, height: 65, borderRadius: 50, marginRight: 10 }}
          />
        </TouchableOpacity>
        <View>
          <Text
            style={{
              fontSize: 12,
              fontWeight: 'bold',
              color: offWhite,
            }}>
            Welcome Back
          </Text>
          <Text style={{ fontSize: 28, fontWeight: 'bold', color: 'white' }}>
            {name}
          </Text>
        </View>
      </View>

      <EBtn
        textColor={neon}
        btnLabel={<Ionicons name="ios-exit-outline" color={neon} size={30} />}
        Press={handleLogout}
      />
    </View>
  );
};

export default Top;
