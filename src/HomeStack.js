import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

import Welcome from './Welcome';
import Home from './Home';
import PlanUpdate from './PlanUpdate';

const HomeStack = ({ setHandleLogout }) => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="HomeScreen">
        {(props) => <Home {...props} setHandleLogout={setHandleLogout} />}
      </Stack.Screen>
      <Stack.Screen name="PlanUpdate" component={PlanUpdate} />
      <Stack.Screen name="Welcome" component={Welcome} />
    </Stack.Navigator>
  );
};

export default HomeStack;
