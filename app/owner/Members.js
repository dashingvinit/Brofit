import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  RefreshControl,
  Modal,
} from 'react-native';
import { bgColor, neon } from '../constants/Constants';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as SecureStore from 'expo-secure-store';
import { Search, GradientBG, Hr, TopBack } from '../components';
import { useIsFocused } from '@react-navigation/native';
import axios from '../constants/Axios';
import MsgModal from '../components/MsgModal';

const Members = (props) => {
  const [users, setUsers] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [found, setfound] = useState(false);

  const getMembers = async () => {
    try {
      const userString = await SecureStore.getItemAsync('user');
      const user = JSON.parse(userString);
      const Id = user.gymId;
      const response = await axios.get(`/gym/mems/${Id}`);
      const data = response.data;
      setUsers(data.data.members);
    } catch (error) {
      {
        alert('Member Fetch error: ' + error.message);
      }
    }
  };

  const isFocused = useIsFocused();
  useEffect(() => {
    if (isFocused) {
      getMembers();
    }
  }, [isFocused]);

  useEffect(() => {
    if (found) {
      const timeout = setTimeout(() => {
        setfound(false);
      }, 2000);
      return () => clearTimeout(timeout);
    }
  }, [found]);

  const handleUserPress = async (user) => {
    props.navigation.navigate('UserProfile', { user });
  };

  const handleSearch = (query) => {
    const filteredUsers = users.filter((user) =>
      user.registerationNumber.toString().includes(query.toLowerCase())
    );
    if (filteredUsers.length === 0 || null) {
      setfound(true);
    } else {
      setUsers(filteredUsers);
    }
  };

  const handleRefresh = async () => {
    setRefreshing(true);

    try {
      const userString = await SecureStore.getItemAsync('user');
      const user = JSON.parse(userString);
      const Id = user.gymId;
      const response = await axios.get(`/gym/mems/${Id}`);
      const data = response.data;
      setUsers(data.data.members);
    } catch (error) {
      {
        alert('Member Fetch error: ' + error.message);
      }
    }

    setRefreshing(false);
  };

  return (
    <GradientBG>
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.container}>
          <TopBack>Gym Members</TopBack>
          <Search onSearch={handleSearch} />
          <View style={styles.userHeader}>
            <Text style={styles.userText}>Name</Text>
            <Text style={styles.userText1}>ID</Text>
          </View>
          <ScrollView
            contentContainerStyle={styles.scrollContainer}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={handleRefresh}
                colors={['blue']}
              />
            }>
            {users?.map((user, index) => (
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
                    <Text style={styles.userText}> {user.name}</Text>

                    <Text style={styles.userText1}>
                      {user.registerationNumber}
                    </Text>
                  </View>
                </TouchableOpacity>
                <Hr />
              </View>
            ))}
          </ScrollView>
          <Modal
            visible={found}
            transparent
            onRequestClose={() => setfound(false)}>
            <MsgModal message={'No Members 😔'} />
          </Modal>
        </View>
      </SafeAreaView>
    </GradientBG>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    paddingBottom: 100,
  },
  userContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 5,
    marginTop: 10,
    width: '100%',
    paddingHorizontal: 10,
  },
  textContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginRight: 20,
  },
  userHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 10,
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: bgColor,
  },
  userText: {
    fontSize: 20,
    color: 'white',
  },
  userText1: {
    fontSize: 20,
    color: neon,
  },
});

export default Members;
