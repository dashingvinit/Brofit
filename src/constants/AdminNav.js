import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';

import Home from '../admin/Adminpage';
import Userrole from '../admin/Userrole';

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
          opacity: 0.9,
          backdropFilter: 'blur(20px)',
          height: 60,
          borderTopWidth: 0,
          elevation: 0,
          margin: 10,
          borderRadius: 20,
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
        component={Userrole}
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons name="ios-people" color={color} size={30} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default OwnerNav;
