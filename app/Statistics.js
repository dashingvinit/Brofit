import { View, Text, TouchableOpacity } from 'react-native';
import { GradientBG } from './components';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Octicons from 'react-native-vector-icons/Octicons';

const Statistics = (props) => {
  const [calories, setCalories] = useState(0);
  const [water, setWater] = useState(0);

  const handleCalories = () => {
    const value = calories + 65;
    setCalories(value);
  };

  const handleWater = () => {
    const value = water + 1;
    setWater(value);
  };

  return (
    <GradientBG>
      <View
        style={{
          backgroundColor: '#d57a61',
          height: '40%',
          borderRadius: 25,
          paddingBottom: 20,
          paddingHorizontal: 20,
          justifyContent: 'flex-end',
        }}>
        <Text
          style={{
            color: '#e3e3e3',
            fontSize: 28,
            fontWeight: 'bold',
            marginBottom: 10,
          }}>
          Today{' '}
          <Text style={{ color: '#e3e3e3', fontSize: 28, fontWeight: 'bold' }}>
            Statistics
          </Text>
        </Text>

        <View
          style={{
            backgroundColor: '#1a1b19',
            borderRadius: 25,
            height: '60%',
            width: '100%',
          }}>
          <View
            style={{
              backgroundColor: '#1a1b19',
              borderRadius: 25,
              padding: 20,
              width: '45%',
              height: '100%',
            }}>
            <Text
              style={{ color: '#e3e3e3', fontSize: 28, fontWeight: 'bold' }}>
              Steps
            </Text>
            <Text
              style={{
                color: '#e3e3e3',
                fontSize: 20,
                marginVertical: 5,
                marginBottom: 10,
              }}>
              0 <Text style={{ fontSize: 14 }}>steps</Text>
            </Text>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <MaterialCommunityIcons name="walk" size={24} color="#e3e3e3">
                <Text style={{ color: '#e3e3e3', fontSize: 12 }}> 10000</Text>
              </MaterialCommunityIcons>
              <TouchableOpacity>
                <View
                  style={{
                    backgroundColor: '#e3e3e3',
                    paddingHorizontal: 7,
                    paddingVertical: 4,
                    borderRadius: 10,
                  }}>
                  <Octicons name="plus" size={24} color="#1a1b19" />
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-around',
          alignItems: 'center',
          marginVertical: 10,
        }}>
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
            {water}/8 <Text style={{ fontSize: 14 }}>glasses</Text>
          </Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <MaterialCommunityIcons name="cup" size={24} color="#9dcfe2">
              <Text style={{ color: '#e3e3e3', fontSize: 12 }}> 4000ml</Text>
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
      </View>
    </GradientBG>
  );
};

export default Statistics;
