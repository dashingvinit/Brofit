import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

import WorkoutPlan from './WorkoutPlan';
import Workouts from './Workouts';

const WorkoutStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="WorkoutPlan" component={WorkoutPlan} />
      <Stack.Screen name="Workouts" component={Workouts} />
    </Stack.Navigator>
  );
};

export default WorkoutStack;
