import { View, Text } from 'react-native';
import axios from '../constants/Axios';
import React from 'react';

const UserProfile = () => {
  const getGymLocation = async () => {
    const response = await axios.get('/gym/3');
    console.log(response.data.data);
  };
  return (
    <View>
      <Text>UserProfile</Text>
    </View>
  );
};

export default UserProfile;
