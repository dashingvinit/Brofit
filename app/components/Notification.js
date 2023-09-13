import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import { TopBack, GradientBG } from '../components';
import { bgGlass, neon, bgColor, bgLight } from '../constants/Constants';
import axios from '../constants/Axios';
import * as SecureStore from 'expo-secure-store';

const Notification = () => {
  const [inactiveData, setInactiveData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const userString = await SecureStore.getItemAsync('user');
      const user = JSON.parse(userString);
      console.log(user?.userId);

      setLoading(false);
    } catch (error) {
      if (error.response && error.response.status === 404) {
        console.log('Data not found');
      } else {
        console.error('Error fetching notification data:', error);
      }
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <GradientBG>
      <View style={{ flex: 1, marginTop: 40 }}>
        <TopBack>Notification</TopBack>
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
                  <Text style={styles.dataItem1}>{member?.userId?.name}</Text>
                  <Text style={styles.dataItem1}>
                    {member?.userId?.registerationNumber}
                  </Text>
                </View>
                <View style={{ flexDirection: 'row' }}>
                  <TouchableOpacity
                    onPress={() => handleEdit(member?.userId?._id)}>
                    <Text style={styles.editButton}>Activate</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => handlePing(member?.userId?._id)}>
                    <Text style={styles.editButton1}>Ping</Text>
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>
            ))
          ) : (
            <View style={{ alignItems: 'center', marginTop: 20 }}>
              <Text style={{ color: neon, fontSize: 20 }}>
                {' '}
                No Notifications{' '}
              </Text>
            </View>
          )}
        </View>
      </View>
    </GradientBG>
  );
};
const styles = StyleSheet.create({
  notify: {
    backgroundColor: bgLight,
    height: 50,
    width: 300,
    fontSize: 20,
    color: neon,
  },
});

export default Notification;
