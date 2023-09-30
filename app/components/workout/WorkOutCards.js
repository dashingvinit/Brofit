import { View, Text } from 'react-native';
import React from 'react';
import TopBack from '../layout/TopBack';
import Cards from './Cards';

const WorkoutCards = (props, { data }) => {
  return (
    <View>
      <TopBack>Workout at home</TopBack>
      {data?.map((item) => (
        <Cards data={item} onPress={() => navigation.navigate('Workout')} />
      ))}
    </View>
  );
};

export default WorkoutCards;
