import React, { useState, useEffect } from 'react';
import { TopBack, GradientBG, Cards, WorkoutClass } from '../../components';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const WorkoutCards = ({ route }) => {
  const { data } = route.params;

  const navigation = useNavigation();

  return (
    <GradientBG>
      <SafeAreaView />
      <TopBack>{data?.title}</TopBack>
      <ScrollView style={{ marginHorizontal: 10 }}>
        <View style={{ paddingBottom: 100 }}>
          <WorkoutClass data={data} navigation={navigation} />
        </View>
      </ScrollView>
    </GradientBG>
  );
};

export default WorkoutCards;
