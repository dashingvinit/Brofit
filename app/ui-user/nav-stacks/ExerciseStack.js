import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Exercise from '../Workouts';
import ExerciseCards from '../../features/exercise-screens/ExerciseCards';
import ExerciseScreen from '../../features/exercise-screens/ExerciseScreen';
import ExerciseList from '../../features/exercise-screens/ExerciseList';

const Stack = createNativeStackNavigator();

export default function ExerciseStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Exercise" component={Exercise} />
      <Stack.Screen name="ExerciseCards" component={ExerciseCards} />
      <Stack.Screen name="ExerciseScreen" component={ExerciseScreen} />
      <Stack.Screen name="ExerciseList" component={ExerciseList} />
    </Stack.Navigator>
  );
}
