import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  RefreshControl,
} from 'react-native';
import { TopBack, GradientBG, Hr } from '../components';
import { SafeAreaView } from 'react-native-safe-area-context';
import { bgColor, bgGlass, bgLight, neon } from '../constants/Constants';
import axios from '../constants/Axios';
import * as SecureStore from 'expo-secure-store';

const InactiveList = (props) => {
  const [inactiveData, setInactiveData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchData = async () => {
    try {
      const userString = await SecureStore.getItemAsync('user');
      const user = JSON.parse(userString);
      const gymId = user.gymId;
      const response = await axios.get(`/userProfile/${gymId}/inactive`);
      const data = await response.data.data;
      setInactiveData(data);
      setLoading(false);
    } catch (error) {
      if (error.response && error.response.status === 404) {
        console.log('Data not found');
      } else {
        console.error('Error fetching attendance data:', error);
      }
      setLoading(false);
    }
  };

  const handleRefresh = () => {
    setRefreshing(true);
    fetchData();
    setRefreshing(false);
  };

  const handleUserPress = async (member) => {
    const user = member.userId;
    props.navigation.navigate('UserProfile', { user });
  };

  const handleEdit = (user) => {
    const updatedStatus = 'active';
    setRefreshing(true);
    axios
      .patch(`/userProfile/plan/${user}`, { status: updatedStatus })
      .then((response) => {
        const responseData = response.data;
        fetchData();
        setRefreshing(false);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <GradientBG>
      <SafeAreaView style={{ flex: 1 }}>
        <TopBack>Inactive Members</TopBack>
        <View style={styles.userHeader}>
          <Text style={styles.userText}>Name</Text>
          <Text style={styles.userText1}>ID</Text>
        </View>
        <ScrollView
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
          }>
          <View style={styles.scrollContainer}>
            {loading ? (
              <ActivityIndicator size="large" />
            ) : inactiveData.length > 0 ? (
              inactiveData.map((member, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.dataContainer}
                  onPress={() => handleUserPress(member)}>
                  <View style={styles.flexRow}>
                    <Text style={styles.dataItem1}>{member.userId.name}</Text>
                    <Text style={styles.dataItem1}>
                      {member.userId.registerationNumber}
                    </Text>
                  </View>
                  <TouchableOpacity
                    onPress={() => handleEdit(member.userId._id)}>
                    <Text style={styles.editButton}>Activate</Text>
                  </TouchableOpacity>
                </TouchableOpacity>
              ))
            ) : (
              <View style={styles.dataContainer}>
                <Text
                  style={{ color: neon, fontSize: 20, textAlign: 'center' }}>
                  No Inactive Members
                </Text>
              </View>
            )}
          </View>
        </ScrollView>
      </SafeAreaView>
    </GradientBG>
  );
};
const styles = StyleSheet.create({
  userHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
    marginHorizontal: 10,
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: bgColor,
  },
  flexRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  userText: {
    fontSize: 24,
    color: 'white',
  },
  userText1: {
    fontSize: 24,
    color: neon,
  },
  scroll: {
    flex: 1,
  },
  scrollContainer: {
    paddingBottom: 100,
  },
  dataContainer: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginVertical: 5,
    marginHorizontal: 10,
    backgroundColor: bgGlass,
    borderRadius: 10,
  },
  dataItem: {
    color: 'white',
    fontSize: 18,
  },
  dataItem1: {
    color: 'white',
    fontSize: 18,
  },
  editButton: {
    color: bgColor,
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingVertical: 5,
    marginTop: 5,
    backgroundColor: neon,
    borderRadius: 10,
  },
});

export default InactiveList;
