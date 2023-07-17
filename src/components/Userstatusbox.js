import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView } from 'react-native';
import axios from '../constants/Axios';
import * as SecureStore from 'expo-secure-store';
import { neon } from '../constants/Constants';

const Userstatusbox = () => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    fetchUserProfileData();
  }, []);

  const fetchUserProfileData = async () => {
    try {
        const userString = await SecureStore.getItemAsync('user');
        const user = JSON.parse(userString); 
        const response = await axios.get(`/userProfile/${user.userId}`);
        const data =await response.data;
        console.log(data.data)
        setUserData(data.data.status)
    } catch (error) {
      console.log('User Profile Error', error);
    }
  };

  return (
    <View>
      <Text style={{color:neon,fontWeight:'bold',fontSize:16}}>{userData}</Text>
    </View>
  );
};

export default Userstatusbox;
