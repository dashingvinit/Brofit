import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

import Workouts from './Workouts';
import {
  DayWiseWorkouts,
  SixDayWorkoutPlan,
  WorkOutPrograms,
} from './components';

const WorkoutStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Workouts" component={Workouts} />
      <Stack.Screen name="SixDayWorkoutPlan" component={SixDayWorkoutPlan} />
      <Stack.Screen name="DayWiseWorkouts" component={DayWiseWorkouts} />
      <Stack.Screen name="Programs" component={WorkOutPrograms} />
    </Stack.Navigator>
  );
};

export default WorkoutStack;
