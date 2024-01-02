import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

import Welcome from '../../ui-welcom/Welcome';
import Home from '../Home';
import UserProfile from '../UserProfile';
import ActiveList from '../home-screens/ActiveList';
import InactiveList from '../home-screens/InactiveList';
import OwnerProfile from '../home-screens/OwnerProfile';
import Notification from '../home-screens/Notification';
import Notificationpush from '../../components/Notificationpush';

const HomeStack = ({ setHandleLogout }) => {
  return (
    <Stack.Navigator
      initialRouteName="HomeScreen"
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
      <Stack.Screen name="ProfilePage" component={OwnerProfile} />
      <Stack.Screen name="Notification" component={Notification} />
      
      <Stack.Screen name="Notificationpush" component={Notificationpush} />
    </Stack.Navigator>
  );
};

export default HomeStack;
