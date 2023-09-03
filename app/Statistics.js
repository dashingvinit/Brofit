import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import { GradientBG } from './components';
import { CircleGraph, Calories, Water } from './components/Statistics';

const Statistics = (props) => {
  return (
    <GradientBG>
      <View style={styles.top}>
        <CircleGraph />
      </View>
      <View style={styles.row}>
        <Calories />
        <Water />
      </View>
    </GradientBG>
  );
};

const styles = StyleSheet.create({
  top: {
    backgroundColor: '#183D3D',
    borderRadius: 15,
    paddingVertical: 30,
    marginBottom: 20,
    borderBottomColor: '#20211f',
    borderBottomWidth: 2,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginVertical: 10,
  },
});

export default Statistics;
