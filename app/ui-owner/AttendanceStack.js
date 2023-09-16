import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

import OwnerAttendance from './OwnerAttendance';
import UserProfile from './UserProfile';

const AttendanceStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="OwnerAttendance" component={OwnerAttendance} />
      <Stack.Screen name="UserProfile" component={UserProfile} />
    </Stack.Navigator>
  );
};

export default AttendanceStack;
