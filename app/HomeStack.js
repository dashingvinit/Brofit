import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

import Welcome from './Welcome';
import Home from './Home';
import ProfileSetup from './ProfileSetup';
import PlanUpdate from './PlanUpdate';
import { DayWiseWorkouts, SixDayWorkoutPlan } from './components';
// import AnimatedVideos from './AnimatedVideos';

const HomeStack = ({ setHandleLogout }) => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="HomeScreen">
        {(props) => <Home {...props} setHandleLogout={setHandleLogout} />}
      </Stack.Screen>
      <Stack.Screen name="ProfileSetup" component={ProfileSetup} />
      <Stack.Screen name="PlanUpdate" component={PlanUpdate} />
      <Stack.Screen name="Welcome" component={Welcome} />
      <Stack.Screen name="SixDayWorkoutPlan" component={SixDayWorkoutPlan} />
      <Stack.Screen name="DayWiseWorkouts" component={DayWiseWorkouts} />
      {/* <Stack.Screen name="AnimatedVideos" component={AnimatedVideos} /> */}
    </Stack.Navigator>
  );
};

export default HomeStack;
