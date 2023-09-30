import React from 'react';
import { GradientBG } from '../components';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CreateWorkout } from './features';

const Exercise = () => {
  return (
    <GradientBG>
      <SafeAreaView />
      <CreateWorkout />
    </GradientBG>
  );
};

export default Exercise;
