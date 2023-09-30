import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import React, { useState, useEffect } from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import * as SecureStore from 'expo-secure-store';
import { neon } from '../../constants/Constants';

const PlanCount = ({ count }) => {
  const [water, setWater] = useState(0);

  const handleWater = async () => {
    console.log('handleWater');
    // const value = water + 1;
    // await SecureStore.setItemAsync('water', value.toString());
    // setWater(value);
  };

  const handleReset = async () => {
    console.log('handleReset');
    // await SecureStore.setItemAsync('water', '0');
    // setWater(0);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>TOTAL</Text>
        <TouchableOpacity onPress={handleReset}>
          <View style={styles.resetButton}>
            <MaterialCommunityIcons
              name="chart-bubble"
              size={24}
              color={neon}
            />
          </View>
        </TouchableOpacity>
      </View>
      <Text style={styles.waterText}>
        {count} <Text style={styles.waterUnit}>PLANS</Text>
      </Text>
      <View style={styles.waterRow}>
        <MaterialCommunityIcons name="cup" size={24} color="#9dcfe2">
          <Text style={styles.waterValue}> 2500ml</Text>
        </MaterialCommunityIcons>

        <MaterialCommunityIcons
          name="water-plus-outline"
          size={24}
          color="#1a1b19"
          style={styles.waterPlusButton}
          onPress={handleWater}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1b19',
    borderRadius: 25,
    padding: 20,
    width: '100%',
    height: 150,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerText: {
    color: '#e3e3e3',
    fontSize: 28,
    fontWeight: 'bold',
  },
  resetButton: {
    backgroundColor: '#526D82',
    padding: 4,
    borderRadius: 10,
  },
  waterText: {
    color: '#e3e3e3',
    fontSize: 20,
    marginVertical: 5,
    marginBottom: 10,
  },
  waterUnit: {
    fontSize: 14,
  },
  waterRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  waterValue: {
    color: '#e3e3e3',
    fontSize: 12,
  },
  waterPlusButton: {
    backgroundColor: '#9dcfe2',
    padding: 4,
    borderRadius: 10,
  },
});

export default PlanCount;
