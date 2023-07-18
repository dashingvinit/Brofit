import React, { useEffect, useState } from 'react';
import * as SecureStore from 'expo-secure-store';
import { View, Text, StyleSheet } from 'react-native';
import axios from '../constants/Axios';
import { bgColor, bgLight, neon } from '../constants/Constants';

const CheckedIn = () => {
  const [users, setUsers] = useState([]);

  const getCheckIn = async () => {
    try {
      const userString = await SecureStore.getItemAsync('user');
      const user = JSON.parse(userString); // Parse the user string to an object
      const gymId = user.gymId;
      const response = await axios.get(`/attendance/${gymId}`);
      const data = response.data;
      setUsers(data.data);
    } catch (error) {
      // alert('Error: ' + error.message);
      console.log('Owner Home checkedIN', error);
    }
  };

  useEffect(() => {
    getCheckIn();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>CheckIn Users</Text>
      <View style={{ backgroundColor: bgColor }}>

        <View style={styles.userContainer}>
            <Text style={styles.userText}>  Name</Text>
            <Text style={styles.userText}>CheckIn</Text>
            <Text style={styles.userText}>CheckOut</Text>
        </View>

        {users.map((user, index) => (
          <View key={index}>
            <TouchableOpacity>
            <View style={styles.userContainer}>
              <Text style={styles.userText}>✔️ {user.userId.name}</Text>
              <Text style={styles.userText}>{user.checkIn}</Text>
              <Text style={styles.userText}>      {user.checkOut}</Text>
            </View>
            </TouchableOpacity>
          </View>
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
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    color: neon,
  },
  userContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection:'row',
    backgroundColor:bgLight,
    marginTop:20,
    borderRadius:25,
    height:50,
  },
  userText: {
    fontSize: 18,
    color: neon,
    marginRight:60,
    marginLeft:20,
  },
});

export default CheckedIn;
