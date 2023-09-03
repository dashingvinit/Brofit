import { View, Text, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';
import Octicons from 'react-native-vector-icons/Octicons';
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

  return (
    <View
      style={{
        backgroundColor: '#1a1b19',
        borderRadius: 25,
        padding: 20,
        width: '45%',
        height: 150,
      }}>
      <Text style={{ color: '#e3e3e3', fontSize: 28, fontWeight: 'bold' }}>
        Food
      </Text>
      <Text
        style={{
          color: '#e3e3e3',
          fontSize: 20,
          marginVertical: 5,
          marginBottom: 10,
        }}>
        {calories} <Text style={{ fontSize: 14 }}>Kcal</Text>
      </Text>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <Octicons name="flame" size={24} color="#edd573">
          <Text style={{ color: '#e3e3e3', fontSize: 12 }}> 65</Text>
        </Octicons>
        <TouchableOpacity onPress={handleCalories}>
          <View
            style={{
              backgroundColor: '#edd573',
              paddingHorizontal: 7,
              paddingVertical: 4,
              borderRadius: 10,
            }}>
            <Octicons name="plus" size={24} color="#1a1b19" />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Calories;
