import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { GradientBG } from './components';
import CircleGraph from './components/Statistics/CircleGraph';
import Calories from './components/Statistics/Calories';
import Water from './components/Statistics/Water';
import React from 'react';

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
  row: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginVertical: 10,
  },
  top: {
    backgroundColor: '#d47961',
    borderRadius: 15,
    paddingVertical: 30,
    marginBottom: 20,
    borderBottomColor: '#20211f',
    borderBottomWidth: 2,
  },
});

export default Statistics;
