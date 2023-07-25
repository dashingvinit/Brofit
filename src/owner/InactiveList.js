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

const InactiveList = () => {
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

  useEffect(() => {
    fetchData();
  }, []);

  const handleEdit = (id) => {
    const updatedStatus = 'active';
    const userid = id;
    console.log(userid);
    axios
      .patch(`/userProfile/plan/${userid}`, { status: updatedStatus })
      .then((response) => {
        const responseData = response.data;
        setInactiveData(responseData.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <GradientBG>
      <SafeAreaView style={{ flex: 1 }}>
        <TopBack>Inactive Members</TopBack>
        <ScrollView
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
          }>
          {loading ? (
            <ActivityIndicator size="large" />
          ) : inactiveData.length > 0 ? (
            inactiveData.map((member) => (
              <View key={member._id} style={styles.dataContainer}>
                <Text style={styles.dataItem}>
                  ID:{' '}
                  <Text style={styles.dataItem1}>
                    {member.userId.registerationNumber}
                  </Text>
                </Text>
                <Text style={styles.dataItem}>
                  Name:{' '}
                  <Text style={styles.dataItem1}>{member.userId.name}</Text>
                </Text>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <Text style={styles.dataItem}>
                    Status:{' '}
                    <Text style={styles.dataItem1}>{member.status}</Text>
                  </Text>
                  <TouchableOpacity
                    onPress={() => handleEdit(member.userId._id)}>
                    <Text style={styles.editButton}>Change</Text>
                  </TouchableOpacity>
                </View>
                <Text style={styles.dataItem}>
                  Email:{' '}
                  <Text style={styles.dataItem1}>{member.userId.email}</Text>
                </Text>
                {member.plan ? (
                  <Text style={styles.dataItem}>
                    Plan:{' '}
                    <Text style={styles.dataItem1}>{member.plan.name}</Text>
                  </Text>
                ) : (
                  <Text style={styles.dataItem}>
                    Plan: <Text style={styles.dataItem1}>No plan exists</Text>
                  </Text>
                )}
              </View>
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
  dataContainer: {
    padding: 16,
    backgroundColor: bgGlass,
    margin: 20,
    borderRadius: 25,
    paddingVertical: 20,
  },
  dataItem: {
    marginBottom: 8,
    color: 'white',
    fontSize: 19,
    paddingVertical: 7,
  },
  dataItem1: {
    marginBottom: 8,
    color: neon,
    fontSize: 19,
    paddingVertical: 7,
  },
  editButton: {
    color: neon,
    fontSize: 16,
    backgroundColor: bgColor,
    height: 30,
    width: 90,
    textAlign: 'center',
    borderRadius: 10,
    paddingVertical: 4,
  },
});

export default InactiveList;
