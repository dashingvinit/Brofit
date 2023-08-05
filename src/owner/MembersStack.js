import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

import Members from './Members';
import UserProfile from './UserProfile';

const MembersStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="Members1"
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Members1" component={Members} />
      <Stack.Screen name="UserProfile" component={UserProfile} />
    </Stack.Navigator>
  );
};

export default MembersStack;
