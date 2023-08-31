import { View, ScrollView } from 'react-native';
import React from 'react';
import { WorkoutClass, TopBack, GradientBG, Video } from './components';
import { SafeAreaView } from 'react-native-safe-area-context';

const Programs = () => {
  return (
    <GradientBG>
      <SafeAreaView style={{ flex: 1 }}>
        <TopBack>Workout Plans</TopBack>
        <ScrollView>
          <View style={{ flex: 1 }}>
            <Video />
            <WorkoutClass />
          </View>
        </ScrollView>
      </SafeAreaView>
    </GradientBG>
  );
};

export default Programs;
