import { View, Text, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import * as SecureStore from 'expo-secure-store';

const Water = () => {
  const [water, setWater] = useState(0);

  useEffect(() => {
    SecureStore.getItemAsync('water').then((value) => {
      if (value) {
        setWater(parseInt(value));
      }
    });
  }, []);

  const handleWater = () => {
    const value = water + 1;
    SecureStore.setItemAsync('water', value.toString());
    setWater(value);
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
        Water
      </Text>
      <Text
        style={{
          color: '#e3e3e3',
          fontSize: 20,
          marginVertical: 5,
          marginBottom: 10,
        }}>
        {water}/10 <Text style={{ fontSize: 14 }}>250ml* </Text>
      </Text>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <MaterialCommunityIcons name="cup" size={24} color="#9dcfe2">
          <Text style={{ color: '#e3e3e3', fontSize: 12 }}> 2500ml</Text>
        </MaterialCommunityIcons>
        <TouchableOpacity onPress={handleWater}>
          <View
            style={{
              backgroundColor: '#9dcfe2',
              padding: 4,
              borderRadius: 10,
            }}>
            <MaterialCommunityIcons
              name="water-plus-outline"
              size={24}
              color="#1a1b19"
            />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Water;
