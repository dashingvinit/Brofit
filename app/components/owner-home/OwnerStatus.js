import React, { useEffect, useState } from 'react';
import * as SecureStore from 'expo-secure-store';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import axios from '../../constants/Axios';
import { neon } from '../../constants/Constants';

const OwnerStatus = (props) => {
  const [users, setUsers] = useState(' ');

  const getCheckIn = async () => {
    try {
      const userString = await SecureStore.getItemAsync('user');
      const user = JSON.parse(userString);
      const gymId = user.gymId;
      const response = await axios.get(`/attendance/${gymId}`);
      const data = response.data;
      setUsers(data.data.length);
    } catch (error) {
      console.log('Owner Home checkedIN', error);
    }
  };

  useEffect(() => {
    getCheckIn();
  }, []);
  return (
    <>
      <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 20 }}>
        {users} Active
      </Text>
      <Text style={{ color: 'white', fontWeight: '100', fontSize: 14 }}>
        Today
      </Text>
    </>
  );
};

export default OwnerStatus;
