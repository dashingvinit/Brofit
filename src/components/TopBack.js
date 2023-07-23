import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';

const TopBack = () => {
  return (
    <View style={styles.container}>
      <Ionicons name="caret-back" size={30} color="black" />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff66',
    borderRadius: 50,
    margin: 10,
  },
});

export default TopBack;
