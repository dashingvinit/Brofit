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
import Ionicons from 'react-native-vector-icons/Ionicons';

import Search from '../components/Search';
import { useIsFocused } from '@react-navigation/native';
import axios from '../constants/Axios';

const Members = (props) => {
  const [users, setUsers] = useState([]);

  const getMembers = async () => {
    try {
      const response = await axios.get('/gym/4');
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
    <SafeAreaView
      style={{
        backgroundColor: bgColor,
        flex: 1,
        paddingBottom: 50,
      }}>
      
        <View style={styles.container}>
          <Text style={styles.heading}>Gym Members</Text>
          <View style={styles.separator} />
          <Search onSearch={handleSearch} />
          <ScrollView contentContainerStyle={styles.scrollContainer}>
          {users.map((user, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => handleUserPress(user)}
              style={styles.userContainer}>
              <Ionicons name="person" color={neon} size={20}/>
              <Text style={styles.userText}>{user.name}</Text>
            </TouchableOpacity>
          ))}
          </ScrollView>
        </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    padding: 10,
    backgroundColor:bgLight,
    marginBottom:30,
    borderRadius:30,
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
    paddingVertical: 20,
    marginTop: 10,
    width: '100%',
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  userText: {
    fontSize: 20,
    color: neon,
    marginLeft:20,
  },
});

export default Members;
