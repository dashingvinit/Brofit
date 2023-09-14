import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import React, { useState, useEffect } from 'react';
import * as SecureStore from 'expo-secure-store';
import EBtn from './ExitButton';
import { bgColor, bgLight, neon, offWhite } from '../constants/Constants';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Top = (props) => {
  const [name, setName] = useState('User');
  const [Role, setRole] = useState('User');

  const getUser = async () => {
    const userObject = await SecureStore.getItemAsync('user');
    if (!userObject) return;
    try {
      const user = JSON.parse(userObject);
      setName(user.name);
      setRole(user.role);
    } catch (error) {
      console.log('top', error);
    }
  };

  const handleLogout = async () => {
    try {
      await SecureStore.deleteItemAsync('token');
      await SecureStore.deleteItemAsync('user');
      props.setHandleLogout();
      props.navigation.navigate('Welcome');
    } catch (error) {
      alert('error');
      console.error('error', error);
    }
  };
  const notify = () => {
    props.navigation.navigate('Notification');
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        {Role === 'Admin' ? (
          <TouchableOpacity>
            <Image
              source={require('../assets/images/profile.jpg')}
              style={styles.img}
            />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            onPress={() => props.navigation.navigate('ProfilePage')}>
            <Image
              source={require('../assets/images/profile.jpg')}
              style={styles.img}
            />
          </TouchableOpacity>
        )}

        <View>
          <Text style={styles.hellomsg}>Welcome Back</Text>
          <Text style={styles.name}>{name}</Text>
        </View>
      </View>
      <View style={styles.row}>
        {Role === 'owner' ? null : (
          <EBtn
            btnLabel={<Ionicons name="notifications" color={neon} size={30} />}
            Press={notify}
          />
        )}
        <EBtn
          btnLabel={<Ionicons name="ios-exit-outline" color={neon} size={30} />}
          Press={handleLogout}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    margin: 10,
    paddingTop: 30,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  img: {
    width: 60,
    height: 60,
    borderRadius: 50,
    marginRight: 10,
  },
  hellomsg: {
    fontSize: 12,
    fontWeight: 'bold',
    color: offWhite,
  },
  name: { fontSize: 24, fontWeight: 'bold', color: 'white' },
});

export default Top;
