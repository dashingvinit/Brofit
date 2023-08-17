import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';

import HomeStack from '../owner/HomeStack';
import MembersStack from '../owner/MembersStack';
import Plans from '../owner/Plans';
import AttendanceStack from '../owner/AttendanceStack';

import { bgLight, neon } from './Constants';

const Tab = createBottomTabNavigator();

const OwnerNav = ({ setHandleLogout }) => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          position: 'absolute',
          backgroundColor: 'rgb(0, 0, 0)',
          opacity: 0.9,
          height: 60,
          borderTopWidth: 0,
          elevation: 0,
          margin: 10,
          borderRadius: 20,
        },
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Plans') {
            iconName = focused ? 'newspaper' : 'newspaper-outline';
          } else if (route.name === 'AttendanceStack') {
            iconName = focused ? 'ios-calendar' : 'ios-calendar-outline';
          } else if (route.name === 'Members') {
            iconName = focused ? 'people' : 'people-outline';
          }

          return (
            <Ionicons
              name={iconName}
              size={30}
              color={color}
              style={{ marginTop: 0 }}
            />
          );
        },
        tabBarLabelStyle: {
          fontSize: 14,
          fontWeight: 'bold',
          marginBottom: 10,
        },
        tabBarActiveTintColor: neon,
        tabBarInactiveTintColor: 'white',
      })}>
      <Tab.Screen name="Home">
        {(props) => <HomeStack {...props} setHandleLogout={setHandleLogout} />}
      </Tab.Screen>
      <Tab.Screen name="Members" component={MembersStack} />
      <Tab.Screen name="Plans" component={Plans} />
      <Tab.Screen name="AttendanceStack" component={AttendanceStack} />
    </Tab.Navigator>
  );
};

export default OwnerNav;
