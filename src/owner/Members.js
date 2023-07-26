import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import {
  bgColor,
  bgLight,
  neon,
  bgGlassLight,
  bgGlass,
} from '../constants/Constants';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import * as SecureStore from 'expo-secure-store';
import { Search, GradientBG, Hr, TopBack } from '../components';
import { useIsFocused } from '@react-navigation/native';
import axios from '../constants/Axios';

const Members = (props) => {
  const [users, setUsers] = useState([]);

  const getMembers = async () => {
    try {
      const userString = await SecureStore.getItemAsync('user');
      const user = JSON.parse(userString);
      const Id = user.gymId;
      const response = await axios.get(`/gym/${Id}`);
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
    if (filteredUsers.length === 0 || null) {
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
          <TopBack>Gym Members</TopBack>
          <View style={styles.separator} />
          <Search onSearch={handleSearch} />
          <View style={styles.userHeader}>
            <Text style={styles.userText}>Name</Text>
            <Text style={styles.userText1}>ID</Text>
          </View>
          <ScrollView contentContainerStyle={styles.scrollContainer}>
            {users.map((user, index) => (
              <View key={index}>
                <TouchableOpacity
                  onPress={() => handleUserPress(user)}
                  style={styles.userContainer}>
                  <Image
                    source={require('../assets/images/profile.jpg')}
                    style={{
                      width: 45,
                      height: 45,
                      borderRadius: 50,
                    }}
                  />
                  <View style={styles.textContainer}>
                    <Text style={styles.userText}>{user.name}</Text>

                    <Text style={styles.userText1}>
                      {user.registerationNumber}
                    </Text>
                  </View>
                </TouchableOpacity>
                <Hr />
              </View>
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
  },
  heading: {
    fontSize: 21,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },
  userContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 5,
    marginTop: 10,
    width: '100%',
    paddingHorizontal: 10,
  },
  userHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 10,
    marginHorizontal: 10,
    borderRadius: 15,
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: bgColor,
  },
  textContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginRight: 20,
  },
  userText: {
    fontSize: 20,
    color: 'white',
    marginLeft: 10,
  },
  userText1: {
    fontSize: 20,
    color: neon,
  },
});

export default Members;
