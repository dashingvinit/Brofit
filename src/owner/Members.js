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

import Search from '../components/Search';
import { useIsFocused } from '@react-navigation/native';
import axios from '../constants/Axios';

const Members = (props) => {
  const [users, setUsers] = useState([]);

  const getMembers = async () => {
    try {
      const response = await axios.get(
        'http://192.168.29.49:7000/api/v1/gym/4'
      );
      const data = response.data;
      setUsers(data.data.members);
    } catch (error) {
      {
        alert('Member Fetch errror: ' + error.message);
      }
    }
  };

  const isFocused = useIsFocused();
  useEffect(() => {
    if (isFocused) {
      getMembers();
    }
  }, [isFocused]);

  const handleUserPress = async (user) => {
    console.log(user);
    props.navigation.navigate('UserProfile', { user });
  };

  const handleSearch = (query) => {
    const filteredUsers = users.filter((user) =>
      user.name.toLowerCase().includes(query.toLowerCase())
    );
    if (filteredUsers.length === 0) {
      Alert.alert('User Not Found', 'No member found with the given name.', [
        { text: 'OK', onPress: () => setUsers(users) },
      ]);
    } else {
      setUsers(filteredUsers);
    }
  };

  return (
    <SafeAreaView style={{ backgroundColor: bgColor, flex: 1 }}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.container}>
          <Text style={styles.heading}>Gym Members</Text>
          <View style={styles.separator} />
          <Search onSearch={handleSearch} />
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
