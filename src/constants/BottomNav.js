import { View, Text } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import { Tab } from '@rneui/base';

import Home from '../Home';
import Timer from '../Timer';
import Attendance from '../Attendance';
import AnimatedVedios from '../AnimatedVedios';

const Tab = createBottomTabNavigator();

const BottomNav = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Timer" component={Timer} />
      <Tab.Screen name="Attendance" component={Attendance} />
      <Tab.Screen name="AnimatedVedios" component={AnimatedVedios} />
    </Tab.Navigator>
  );
};

export default BottomNav;
