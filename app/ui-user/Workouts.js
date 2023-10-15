import { View, ScrollView } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { GradientBG, Runtimer, SixdayWorkOutCard } from '../components';

const Workouts = (props) => {
  return (
    <GradientBG>
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView>
          <Runtimer />
          <SixdayWorkOutCard navigation={props.navigation} />
        </ScrollView>
      </SafeAreaView>
    </GradientBG>
  );
};

export default Workouts;
