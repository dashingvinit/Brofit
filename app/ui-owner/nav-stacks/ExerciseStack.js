import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Exercise from '../Exercise';
import ExerciseCards from '../exercise-screens/ExerciseCards';
import ExerciseScreen from '../exercise-screens/ExerciseScreen';

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
    </Stack.Navigator>
  );
}
