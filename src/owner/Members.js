import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { bgColor, bgLight, neon } from '../constants/Constants';
import { SafeAreaView } from 'react-native-safe-area-context';
import axios from 'axios';

const Members = () => {
  const [users, setUsers] = useState([]);

  const getMembers = async () => {
    try {
      const response = await fetch('http://192.168.29.77:7000/api/v1/gym/3');
      const data = await response.json();
      setUsers(data.data.members);
    } catch (error) {
      {
        alert('Error: ' + error.message);
      }
    }
  };

  useEffect(() => {
    getMembers();
  }, []);

  const handleUserPress = async (user) => {
    try {
      // const response = await fetch(
      //   `http://192.168.29.211:7000/api/v1/userProfile/${user._id}`
      // );
      const response = await axios.get(`/userProfile/${user._id}`);
      const data = response.data;
      console.log(data);
    } catch (error) {
      console.log('members page', error);
      alert('Error: ' + error.message);
    }
  };

  return (
    <SafeAreaView style={{ backgroundColor: bgColor, flex: 1 }}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.container}>
          <Text style={styles.heading}>Gym Members</Text>
          <View style={styles.separator} />
          {users.map((user) => (
            <TouchableOpacity
              key={user._id}
              onPress={() => handleUserPress(user)}
              style={styles.userContainer}>
              <Text style={styles.userText}>✔️ {user.name}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    padding: 16,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },
  userContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingVertical: 18,
    marginTop: 20,
  },
  userText: {
    fontSize: 20,
    color: neon,
  },
});

export default Members;
