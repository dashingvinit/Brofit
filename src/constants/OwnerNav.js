import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';

import HomeStack from '../owner/HomeStack';
import MembersStack from '../owner/MembersStack';
import Plans from '../owner/Plans';
import OwnerAttendance from '../owner/OwnerAttendance';

import { bgLight, neon } from './Constants';

const Tab = createBottomTabNavigator();

const OwnerNav = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          position: 'absolute',
          backgroundColor: bgLight,
          height: 60,
          borderTopWidth: 0,
          elevation: 0,
        },
        tabBarLabelStyle: {
          fontSize: 14,
          fontWeight: 'bold',
          marginBottom: 10,
        },

        tabBarActiveTintColor: neon,
        tabBarInactiveTintColor: 'white',
      }}
      initialRouteName="Home"
      activeColor={neon}
      inactiveColor="#3e2465">
      <Tab.Screen
        name="Home"
        component={HomeStack}
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons name="ios-home-outline" color={color} size={30} />
          ),
        }}
      />
      <Tab.Screen
        name="Members"
        component={MembersStack}
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons name="ios-people" color={color} size={30} />
          ),
        }}
      />

      <Tab.Screen
        name="Plans"
        component={Plans}
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons name="md-list" color={color} size={30} />
          ),
        }}
      />

      <Tab.Screen
        name="OwnerAttendance"
        component={OwnerAttendance}
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons name="checkmark-done" color={color} size={30} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default OwnerNav;
