import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

import Welcome from '../Welcome';
import Home from './Home';
import UserProfile from './UserProfile';
import ActiveList from './ActiveList';
import InactiveList from './InactiveList';

const HomeStack = ({ setHandleLogout }) => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="HomeScreen">
        {(props) => <Home {...props} setHandleLogout={setHandleLogout} />}
      </Stack.Screen>
      <Stack.Screen name="UserProfile" component={UserProfile} />
      <Stack.Screen name="ActiveList" component={ActiveList} />
      <Stack.Screen name="InactiveList" component={InactiveList} />
      <Stack.Screen name="Welcome" component={Welcome} />
    </Stack.Navigator>
  );
};

export default HomeStack;
