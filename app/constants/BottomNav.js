import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import WorkoutStack from '../WorkoutStack';
import HomeStack from '../HomeStack';
import Timer from '../Timer';
import Attendance from '../Attendance';
import ProfilePage from '../ProfilePage';
import { neon } from './Constants';

const Tab = createBottomTabNavigator();

const BottomNav = ({ setHandleLogout }) => {
  return (
    <Tab.Navigator
      initialRouteName="HomeStack" // Make sure "HomeStack" is a valid screen name
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          position: 'absolute',
          backgroundColor: 'rgb(0, 0, 0)',
          opacity: 0.9,
          height: 64,
          borderTopWidth: 0,
          elevation: 0,
          margin: 10,
          borderRadius: 20,
          paddingBottom: 0,
        },
        tabBarIcon: ({ focused, color }) => {
          let iconName;

          if (route.name === 'HomeStack') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'WorkoutStack') {
            iconName = focused ? 'md-barbell' : 'md-barbell-outline';
          } else if (route.name === 'Stats') {
            iconName = focused ? 'ios-stats-chart' : 'ios-stats-chart-outline';
          } else if (route.name === 'Attendance') {
            iconName = focused ? 'ios-calendar' : 'ios-calendar-outline';
          } else if (route.name === 'ProfilePage') {
            iconName = focused ? 'person' : 'person-outline';
          }

          return (
            <Ionicons
              name={iconName}
              size={30}
              color={color}
              style={{ justifyContent: 'center' }}
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
        activeColor: neon,
        inactiveColor: '#3e2465',
      })}>
      <Tab.Screen name="HomeStack">
        {(props) => <HomeStack {...props} setHandleLogout={setHandleLogout} />}
      </Tab.Screen>
      <Tab.Screen name="Attendance" component={Attendance} />
      <Tab.Screen name="WorkoutStack" component={WorkoutStack} />
      <Tab.Screen name="Stats" component={Timer} />
      <Tab.Screen name="ProfilePage">
        {(props) => (
          <ProfilePage {...props} setHandleLogout={setHandleLogout} />
        )}
      </Tab.Screen>
    </Tab.Navigator>
  );
};

export default BottomNav;
