import { View, ScrollView } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  GradientBG,
  WorkoutClass,
  Runtimer,
  WorkoutPrograms,
  SixdayWorkOutCard,
} from './components';

const Workouts = (props) => {
  return (
    <GradientBG>
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView>
          <Runtimer />
          <SixdayWorkOutCard navigation={props.navigation} />
          <WorkoutPrograms />
          <View style={{ marginHorizontal: 10, paddingBottom: 80 }}>
            <WorkoutClass navigation={props.navigation} />
          </View>
        </ScrollView>
      </SafeAreaView>
    </GradientBG>
  );
};

export default Workouts;
