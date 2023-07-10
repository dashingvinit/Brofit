import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Welcome from '../Welcome';
import Signup from '../Signup';
import ProfileSetup from '../ProfileSetup';
import Login from '../Login';
import OwnerLogin from '../OwnerLogin';
import Home from '../Home';
import AnimatedVedios from '../AnimatedVedios ';
import Attendance from '../Attendance';
import Timer from '../Timer'

const Stack = createNativeStackNavigator();

const StackNav = () => {
  return (
    <Stack.Navigator
      initialRouteName="Welcome"
      screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Welcome" component={Welcome} />
      <Stack.Screen name="Signup" component={Signup} />
      <Stack.Screen name="ProfileSetup" component={ProfileSetup} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="OwnerLogin" component={OwnerLogin} />
      <Stack.Screen name="Home1" component={Home} />
      <Stack.Screen name="AnimatedVideos" component={AnimatedVedios} />
      <Stack.Screen name="Attendance" component={Attendance} />
      <Stack.Screen name="Timer" component={Timer} />
    </Stack.Navigator>
  );
};

export default StackNav;
