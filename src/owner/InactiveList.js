import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, ScrollView, TouchableOpacity, StyleSheet, RefreshControl } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { bgColor, bgLight, neon } from '../constants/Constants';
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
      console.error('Error fetching data:', error);
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
    const updatedStatus = "active";
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
    <SafeAreaView style={{ flex: 1, backgroundColor: bgColor }}>
      <View style={{ marginTop: 20, alignItems: 'center' }}>
        <Text style={styles.heading}>Inactive Members</Text>
      </View>
      <ScrollView
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />}
      >
        {loading ? (
          <ActivityIndicator size="large" />
        ) : inactiveData.length > 0 ? (
          inactiveData.map((member) => (
            <View key={member._id} style={styles.dataContainer}>
              <Text style={styles.dataItem}>
                Name: <Text style={styles.dataItem1}>{member.userId.name}</Text>
              </Text>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text style={styles.dataItem}>
                  Status: <Text style={styles.dataItem1}>{member.status}</Text>
                </Text>
                <TouchableOpacity onPress={() => handleEdit(member.userId._id)}>
                  <Text style={styles.editButton}>Change</Text>
                </TouchableOpacity>
              </View>
              <Text style={styles.dataItem}>
                Email: <Text style={styles.dataItem1}>{member.userId.email}</Text>
              </Text>
              {member.plan ? (
                <Text style={styles.dataItem}>
                  Plan: <Text style={styles.dataItem1}>{member.plan.name}</Text>
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
            <Text style={{ color: neon, fontSize: 20 }}>No data available</Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  heading: {
    fontSize: 34,
    fontWeight: 'bold',
    marginBottom: 20,
    color: 'white',
  },
  dataContainer: {
    padding: 16,
    backgroundColor: bgLight,
    margin: 20,
    borderRadius: 25,
    paddingVertical: 20,
    marginBottom: -5,
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
    backgroundColor:bgColor,
    height:30,
    width:90,
    textAlign:'center',
    borderRadius:10,
    paddingVertical:4,
  },
});

export default InactiveList;
