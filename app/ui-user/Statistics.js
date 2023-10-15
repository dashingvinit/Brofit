import { View, StyleSheet } from 'react-native';
import React from 'react';
import { GradientBG } from '../components';
import { CircleGraph, Calories, Water } from '../components/statistics';

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
    backgroundColor: '#618b63',
    borderRadius: 15,
    paddingTop: 30,
    paddingBottom: 20,
    marginBottom: 10,
    borderBottomColor: '#20211f',
    borderBottomWidth: 2,
  },
  row: {
    flexDirection: 'row',
    gap: 10,
    marginHorizontal: 10,
    justifyContent: 'space-around',
    alignItems: 'center',
    marginVertical: 10,
  },
});

export default Statistics;
