import React, { useEffect, useState } from 'react';
import * as SecureStore from 'expo-secure-store';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import axios from '../constants/Axios';
import {
  bgColor,
  bgGlass,
  bgGlassLight,
  bgLight,
  neon,
} from '../constants/Constants';
import { ScrollView } from 'react-native';

const CheckedIn = (props) => {
  const [users, setUsers] = useState([]);

  const getCheckIn = async () => {
    try {
      const userString = await SecureStore.getItemAsync('user');
      const user = JSON.parse(userString);
      const gymId = user.gymId;
      const response = await axios.get(`/attendance/${gymId}`);
      const data = response.data;
      setUsers(data.data);
    } catch (error) {
      console.log('Owner Home checkedIN', error);
    }
  };

  useEffect(() => {
    getCheckIn();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Active Check-Ins</Text>
      <View style={styles.userListContainer}>
        <View style={styles.userHeader}>
          <Text style={styles.userName}>Reg. ID</Text>
          <Text style={styles.checkInOut}>Check-In</Text>
          <Text style={styles.checkInOut}>Check-Out</Text>
        </View>
        {users.map((user, index) => (
          <TouchableOpacity key={index} style={styles.userItem}>
            <Text style={styles.userNameText}>
              Id: {user.userId.registerationNumber} {'\n'}
              {user.userId.name}
            </Text>
            <Text style={styles.checkTime}>{user.checkIn}</Text>
            <Text style={styles.checkTime}>{user.checkOut}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 100,
    marginTop: 10,
    paddingTop: 20,
    borderRadius: 10,
    backgroundColor: bgLight,
  },
  heading: {
    fontSize: 32,
    fontWeight: 900,
    color: 'white',
    marginBottom: 10,
    textAlign: 'center',
  },
  userListContainer: {
    backgroundColor: bgGlassLight,
    borderRadius: 10,
    paddingVertical: 10,
    paddingBottom: 50,
  },
  userHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 10,
    borderRadius: 15,
    height: 40,
    paddingHorizontal: 10,
    backgroundColor: bgColor,
  },
  userItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 8,
    borderRadius: 15,
    height: 50,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
  },
  userName: {
    flex: 1,
    fontWeight: 'bold',
    color: neon,
    fontSize: 16,
  },
  userNameText: {
    flex: 1,
    fontWeight: 'bold',
    color: bgColor,
    fontSize: 16,
    marginLeft: 0,
  },
  checkInOut: {
    flex: 1,
    textAlign: 'center',
    color: '#fff',
    fontSize: 16,
  },
  checkTime: {
    flex: 1,
    textAlign: 'center',
    color: bgColor,
    fontSize: 16,
  },
});

export default CheckedIn;
