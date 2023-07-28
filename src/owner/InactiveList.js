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
        // console.log('Data not found');
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

  const handleEdit = (id) => {
    const updatedStatus = 'active';
    const userid = id;
    console.log(userid);
    axios
      .patch(`/userProfile/plan/${userid}`, { status: updatedStatus })
      .then(() => {
        fetchData(); // Fetch the updated data again after successful PATCH request
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
          {loading ? (
            <ActivityIndicator size="large" />
          ) : inactiveData.length > 0 ? (
            inactiveData.map((member, index) => (
              <TouchableOpacity
                key={index}
                style={styles.dataContainer}
                onPress={() => handleUserPress(member)}>
                <Text style={styles.dataItem}>
                  ID:{' '}
                  <Text style={styles.dataItem1}>
                    {member.userId.registerationNumber}
                  </Text>
                </Text>

                <Text style={styles.dataItem1}>{member.userId.name}</Text>

                <TouchableOpacity onPress={() => handleEdit(member.userId._id)}>
                  <Text style={styles.editButton}>Change</Text>
                </TouchableOpacity>
              </TouchableOpacity>
            ))
          ) : (
            <View style={styles.dataContainer}>
              <Text style={{ color: neon, fontSize: 20, textAlign: 'center' }}>
                No Inactive Members
              </Text>
            </View>
          )}
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
    paddingBottom: 50,
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
    color: neon,
    fontSize: 18,
  },
  editButton: {
    color: 'white',
    fontSize: 20,
    backgroundColor: bgLight,
    fontWeight: 'bold',
  },
});

export default InactiveList;
