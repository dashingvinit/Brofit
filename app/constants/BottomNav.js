import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { customSlideTransition } from './CustomTransition';

import { BlurView } from 'expo-blur';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';

import WorkoutStack from '../WorkoutStack';
import HomeStack from '../HomeStack';
import Timer from '../Timer';
import Attendance from '../Attendance';
import ProfilePage from '../ProfilePage';
import { bgLight, neon } from './Constants';

const Tab = createBottomTabNavigator();

const BottomNav = ({ setHandleLogout }) => {
  return (
    <BlurView style={{ flex: 1 }} intensity={100}>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarStyle: {
            position: 'absolute',
            backgroundColor: bgLight,
            opacity: 0.9,
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
          // cardStyleInterpolator: customSlideTransition,
          tabBarActiveTintColor: neon,
          tabBarInactiveTintColor: 'white',
        }}
        initialRouteName="HomeStack"
        activeColor={neon}
        inactiveColor="#3e2465">
        <Tab.Screen
          name="HomeStack"
          options={{
            tabBarIcon: ({ color }) => (
              <AntDesign name="home" color={color} size={30} />
            ),
          }}>
          {(props) => (
            <HomeStack {...props} setHandleLogout={setHandleLogout} />
          )}
        </Tab.Screen>
        <Tab.Screen
          name="Attendance"
          component={Attendance}
          options={{
            tabBarIcon: ({ color }) => (
              <Feather name="calendar" color={color} size={30} />
            ),
          }}
        />
        <Tab.Screen
          name="WorkoutStack"
          component={WorkoutStack}
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
          name="ProfilePage"
          component={ProfilePage}
          options={{
            tabBarIcon: ({ color }) => (
              <AntDesign name="user" color={color} size={30} />
            ),
          }}
        />
      </Tab.Navigator>
    </BlurView>
  );
};

export default BottomNav;
