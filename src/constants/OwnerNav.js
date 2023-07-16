import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';

import Home from '../owner/Home';
import MembersStack from '../owner/MembersStack';
import Plans from '../owner/Plans';

import { neon } from './Constants';

const Tab = createBottomTabNavigator();

const OwnerNav = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          position: 'absolute',
          backgroundColor: 'rgba(42, 43, 43, 0.8)',
          // backdropFilter: 'blur(20px)',
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
        component={Home}
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
    </Tab.Navigator>
  );
};

export default OwnerNav;
