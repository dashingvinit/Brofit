import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView } from 'react-native';
import axios from '../../constants/Axios';
import * as SecureStore from 'expo-secure-store';
import { neon } from '../../constants/Constants';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';

const Userstatusbox = () => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    fetchUserProfileData();
  }, []);

  const fetchUserProfileData = async () => {
    try {
      const userString = await SecureStore.getItemAsync('user');
      const user = JSON.parse(userString);
      const userID = user?.userId || user?._id;
      const response = await axios.get(`/userProfile/${userID}`);
      const data = await response.data;
      // console.log(data.data);
      const status = data.data.status;
      const capitalizedUserData =
        status.charAt(0).toUpperCase() + status.slice(1);
      setUserData(capitalizedUserData);
    } catch (error) {
      if (error.response && error.response.status === 400) {
        console.log('no data');
      } else {
        console.log('User Profile Error', error);
      }
    }
  };

  return (
    <View style={{ alignItems: 'center' }}>
      {userData === 'Active' ? (
        <Ionicons
          name="ios-heart-outline"
          style={{
            color: neon,
          }}
          size={50}
        />
      ) : (
        <Ionicons
          name="ios-heart-dislike-outline"
          style={{
            color: neon,
          }}
          size={45}
        />
      )}
      <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 20 }}>
        {userData}
      </Text>
      <Text style={{ color: 'white', fontWeight: '100', fontSize: 14 }}>
        Status
      </Text>
    </View>
  );
};

export default Userstatusbox;
