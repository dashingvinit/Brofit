import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import { bgColor, bgLight, neon } from '../constants/Constants';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import * as SecureStore from 'expo-secure-store';
import { Search, GradientBG, Hr } from '../components';
import { useIsFocused } from '@react-navigation/native';
import axios from '../constants/Axios';

const Members = (props) => {
  const [users, setUsers] = useState([]);

  const getMembers = async () => {
    try {
      const userString = await SecureStore.getItemAsync('user');
      const user = JSON.parse(userString);
      const gymId = user.gymId;
      const response = await axios.get(`/gym/${gymId}`);
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
      user.registerationNumber.toString().includes(query.toLowerCase())
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
    <GradientBG>
      <SafeAreaView
        style={{
          flex: 1,
        }}>
        <View style={styles.container}>
          <Text style={styles.heading}>Gym Members</Text>
          <View style={styles.separator} />
          <Search onSearch={handleSearch} />

          <View style={styles.userHeader}>
                <Text style={styles.userText}>Name</Text>
                <Text style={styles.userText1}>ID</Text>
          </View>
          <ScrollView contentContainerStyle={styles.scrollContainer}>         
              {users.map((user) => (
                <React.Fragment key={user.id}> 
                  <TouchableOpacity
                    onPress={() => handleUserPress(user)}
                    style={styles.userContainer}>
                    <Ionicons name="person" color={neon} size={20} />
                    <Text style={styles.userText}>{user.name}</Text>
                    <Text style={styles.userText1}>{user.registerationNumber}</Text>
                  </TouchableOpacity>
                  <Hr />
                </React.Fragment>
              ))}
            </ScrollView>
        </View>
      </SafeAreaView>
    </GradientBG>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    borderRadius: 10,
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
  userText: {
    flex: 2,
    fontSize: 20,
    color: neon,
    marginLeft: 20,
  },
  userText1: {
    flex: 1,
    fontSize: 20,
    color: neon,
    marginLeft: '50%',
  },
});

export default Members;
