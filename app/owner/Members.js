import React, { useEffect, useState, useRef} from 'react';
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
import {
  bgColor,
  bgLight,
  neon,
  bgGlassLight,
  bgGlass,
} from '../constants/Constants';
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
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(40);
  const [numberpages,setnumberpages] = useState(50);


  const getMembers = async () => {
    try {
      const userString = await SecureStore.getItemAsync('user');
      const user = JSON.parse(userString);
      const gymId = user.gymId;
      const response = await axios.get(`/gym/mems/${gymId}?page=${page}&limit=${limit}`);
      const data = response.data;
      // console.log(response.data.data)
      // console.log(typeof setUsers);
      setUsers(data.data.MembersArray);
      setnumberpages(data.data.totalPages)
    } catch (error) {
      alert('Member Fetch error: ' + error.message);
    }
  };
  const scrollRef = useRef(null);

  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      getMembers();
    }
  }, [isFocused, page]);

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

  const handleSearch = async(query) => {
    try {
      const userString = await SecureStore.getItemAsync('user');
      const user = JSON.parse(userString);
      const gymId = user.gymId;
      const response = await axios.get(`user/search/${gymId}/${query}`)
      const data = response.data;
      console.log(data.data);
      console.log(typeof setUsers); 
      setUsers(data.data); 
      console.log('After setUsers', users);
    } catch (error) {
      console.log(error);
    }
  };
  

  const handleRefresh = async () => {
    setRefreshing(true);
    try {
      const userString = await SecureStore.getItemAsync('user');
      const user = JSON.parse(userString);
      const gymId = user.gymId;
      const url = `/gym/mems/${gymId}?page=${page}&limit=${limit}`;
      const response = await axios.get(url);
      const data = response.data;
      setUsers(data.data);
    } catch (error) {
      alert('Member Fetch error: ' + error.message);
    }

    setRefreshing(false);
  };

  const handleNextPage = () => {
    if (page < 5) {
      setPage(page + 1);
      scrollRef.current.scrollTo({ x: 0, y: 0, animated: true });
    }
  };

  const handlePrevPage = () => {
    if (page > 1) {
      setPage(page - 1);
      scrollRef.current.scrollTo({ x: 0, y: 0, animated: true });
    }
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
            } ref={scrollRef}>
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
          <View style={styles.paginationButtons}>
          {page > 1 && (
            <TouchableOpacity
              onPress={handlePrevPage}
              style={{
                backgroundColor: neon,
                height: 30,
                width: 80,
                borderRadius: 20,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text style={styles.paginationText}>Prev</Text>
            </TouchableOpacity>
          )}
          {page < numberpages && (
            <TouchableOpacity
              onPress={handleNextPage}
              style={{
                backgroundColor: neon,
                height: 30,
                width: 80,
                borderRadius: 20,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text style={styles.paginationText}>Next</Text>
            </TouchableOpacity>
          )}
        </View>
        </ScrollView>
          <Modal visible={found} transparent onRequestClose={() => setfound(false)}>
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
  paginationButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom:20,
    marginTop:50,
    gap:20,
  },
  paginationText: {
    fontSize: 18,
    color: 'blue',
    marginHorizontal: 10,
  },
});

export default Members;
