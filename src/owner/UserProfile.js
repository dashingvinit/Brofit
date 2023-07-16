import { View, Text } from 'react-native';
import axios from '../constants/Axios';
import React from 'react';
import Background from '../components/Background';

const UserProfile = (props) => {
  const user = props.route.params.user;
  return (
    <Background>
      <View>
        <Text>{user.name}</Text>
      </View>
    </Background>
  );
};

export default UserProfile;
