import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';

import Welcome from '../Welcome';
import Home from '../Home';
import Timer from '../Timer';
import Attendance from '../Attendance';
import { neon } from './Constants';

const Tab = createBottomTabNavigator();

const BottomNav = () => {
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
        name="Timer1"
        component={Timer}
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons name="ios-barbell-outline" color={color} size={30} />
          ),
        }}
      />

      <Tab.Screen
        name="Timer"
        component={Timer}
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons name="ios-timer-outline" color={color} size={30} />
          ),
        }}
      />
      <Tab.Screen
        name="Attendance"
        component={Attendance}
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons name="checkmark-done" color={color} size={30} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomNav;
