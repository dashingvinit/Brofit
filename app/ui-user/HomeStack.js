import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

import Welcome from '../ui-welcom/Welcome';
import Home from './Home';
import PlanUpdate from './PlanUpdate';
import ProfileSetup from '../ui-welcom/ProfileSetup';
import Timer from './Timer';
import Notification from '../components/Notification';

const HomeStack = ({ setHandleLogout }) => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="HomeScreen">
        {(props) => <Home {...props} setHandleLogout={setHandleLogout} />}
      </Stack.Screen>
      <Stack.Screen name="ProfileSetup" component={ProfileSetup} />
      <Stack.Screen name="PlanUpdate" component={PlanUpdate} />
      <Stack.Screen name="Welcome" component={Welcome} />
      <Stack.Screen name="Timer" component={Timer} />
      <Stack.Screen name="Notification" component={Notification} />
    </Stack.Navigator>
  );
};

export default HomeStack;
