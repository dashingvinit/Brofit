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
import axios from '../constants/Axios';

const Members = (props) => {
  const [users, setUsers] = useState([]);

  const getMembers = async () => {
    try {
      const response = await axios.get('/gym/4');
      const data = response.data;
      console.log(response.data.data.members);
      setUsers(data.data.members);
    } catch (error) {
      {
        alert('Member Fetch errror: ' + error.message);
      }
    }
  };

  useEffect(() => {
    getMembers();
  }, []);

  const handleUserPress = async (user) => {
    console.log(user);
    props.navigation.navigate('UserProfile', { user });
  };

  return (
    <SafeAreaView style={{ backgroundColor: bgColor, flex: 1 }}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.container}>
          <Text style={styles.heading}>Gym Members</Text>
          <View style={styles.separator} />
          {users.map((user, index) => (
            <TouchableOpacity
              key={index}
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
