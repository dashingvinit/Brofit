import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Octicons from 'react-native-vector-icons/Octicons';
import React from 'react';

const DietChart = () => {
  return (
    <TouchableOpacity>
      <View>
        <Text style={styles.text}>
          Diet Plans <Octicons name="graph" size={24} color="#fff" />
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  text: {
    color: '#fff',
    fontSize: 32,
    fontWeight: 'bold',
    marginVertical: 10,
  },
});

export default DietChart;
