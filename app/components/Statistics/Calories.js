import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import React, { useState, useEffect } from 'react';
import Octicons from 'react-native-vector-icons/Octicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import * as SecureStore from 'expo-secure-store';

const Calories = () => {
  const [calories, setCalories] = useState(0);

  useEffect(() => {
    SecureStore.getItemAsync('calories').then((value) => {
      if (value) {
        setCalories(parseInt(value));
      }
    });
  }, []);

  const handleCalories = () => {
    const value = calories + 65;
    SecureStore.setItemAsync('calories', value.toString());
    setCalories(value);
  };

  const handleReset = () => {
    SecureStore.setItemAsync('calories', '0');
    setCalories(0);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Food</Text>
        <TouchableOpacity onPress={handleReset}>
          <View style={styles.resetButton}>
            <MaterialCommunityIcons name="cancel" size={24} color="#EFE1D1" />
          </View>
        </TouchableOpacity>
      </View>
      <Text style={styles.caloriesText}>
        {calories} <Text style={styles.caloriesUnit}>Kcal</Text>
      </Text>
      <View style={styles.caloriesRow}>
        <Octicons name="flame" size={24} color="#edd573">
          <Text style={styles.caloriesValue}> 65</Text>
        </Octicons>
        <TouchableOpacity onPress={handleCalories}>
          <View style={styles.plusButton}>
            <Octicons name="plus" size={24} color="#1a1b19" />
          </View>
        </TouchableOpacity>
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
    backgroundColor: '#3F2305',
    padding: 4,
    borderRadius: 10,
  },
  caloriesText: {
    color: '#e3e3e3',
    fontSize: 20,
    marginVertical: 5,
    marginBottom: 10,
  },
  caloriesUnit: {
    fontSize: 14,
  },
  caloriesRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  caloriesValue: {
    color: '#e3e3e3',
    fontSize: 12,
  },
  plusButton: {
    backgroundColor: '#edd573',
    paddingHorizontal: 7,
    paddingVertical: 4,
    borderRadius: 10,
  },
});

export default Calories;
