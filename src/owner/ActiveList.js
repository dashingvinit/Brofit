import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { GradientBG, Hr, TopBack } from '../components';
import { SafeAreaView } from 'react-native-safe-area-context';
import { bgColor, bgGlass, bgLight, neon } from '../constants/Constants';
import axios from '../constants/Axios';
import * as SecureStore from 'expo-secure-store';

const ActiveList = () => {
  const [inactiveData, setInactiveData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const userString = await SecureStore.getItemAsync('user');
      const user = JSON.parse(userString);
      const gymId = user.gymId;
      const response = await axios.get(`/userProfile/${gymId}/active`);
      const data = await response.data.data;
      setInactiveData(data);
      setLoading(false);
    } catch (error) {
      if (error.response && error.response.status === 404) {
        console.log('Data not found');
        setInactiveData([]);
      } else {
        console.error('Error fetching data:', error);
      }
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <GradientBG>
      <SafeAreaView style={{ flex: 1 }}>
        <TopBack>Active Members</TopBack>
        <ScrollView>
          {loading ? (
            <ActivityIndicator size="large" />
          ) : inactiveData.length > 0 ? (
            inactiveData.map((member) => (
              <View key={member._id} style={styles.dataContainer}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
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
                </View>

                <Text style={styles.dataItem}>
                  Email:{' '}
                  <Text style={styles.dataItem1}>{member.userId.email}</Text>
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
                </View>
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
              <Text style={{ color: neon, fontSize: 20 }}>
                No Active Members
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
    fontWeight: 'bold',
  },
});

export default ActiveList;
