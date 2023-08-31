import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import { bgGlass } from '../../constants/Constants';

const Video = () => {
  return <View style={styles.container}></View>;
};

const styles = {
  container: {
    height: '40%',
    width: '100%',
    backgroundColor: bgGlass,
    borderRadius: 25,
  },
};

export default Video;
