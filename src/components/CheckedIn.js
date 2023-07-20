import React, { useEffect, useState } from 'react';
import * as SecureStore from 'expo-secure-store';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import axios from '../constants/Axios';
import { bgColor, bgLight, neon } from '../constants/Constants';
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
      <Text style={styles.heading}>Today's Checked-In Users</Text>
      <View style={styles.userListContainer}>
        <View style={styles.userContainer}>
          <Text style={styles.userText}>Name</Text>
          <Text style={styles.userText1}>Check-In</Text>
          <Text style={styles.userText}>Check-Out</Text>
        </View>
        {users.map((user, index) => (
          <TouchableOpacity key={index}>
            <View style={styles.userContainer}>
              <Text style={styles.userName}>{user.userId.name}</Text>
              <Text style={styles.checkTime}>{user.checkIn}</Text>
              <Text style={styles.checkTime}>{user.checkOut}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: bgColor, 
    padding: 16,
    paddingBottom: 100,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    color: neon, 
    marginBottom: 20,
  },
  userListContainer: {
    backgroundColor: bgLight,
    borderRadius: 10, 
    paddingVertical: 20,
  },
  userContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    
    marginVertical: 10,
    borderRadius: 15, 
    height: 60, 
    paddingHorizontal: 20,
  },
  userText: {
    fontSize: 16,
    color: 'white', 
  },
  userText1: {
    fontSize: 16,
    color: 'white', 
    marginLeft:35,
  },
  userName: {
    flex: 1,
    fontWeight: 'bold',
    color: neon, // Updated text color
  },
  checkTime: {
    flex: 1,
    textAlign: 'center',
    color: neon,
  },
});

export default CheckedIn;
