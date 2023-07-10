import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import axios from './constants/Axios';
import { Calendar } from 'react-native-calendars';
import { COLORS } from './constants';
import FetchQuote from './components/FetchQuote';
import { bgColor, bgLight, neon } from './constants/Constants';

const Attendance = () => {
  const handleCheckIn = async () => {
    try {
      const response = await axios.post('/attendance');
      alert('Done');
      // fetchAttendanceData();
    } catch (error) {
      if (error.response && error.response.status === 500) {
        alert('Internal Server Error: Please try again later.');
      } else {
        alert('Error: ' + error.message);
      }
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: bgColor, paddingTop: 40 }}>
      <View style={{ flex: 1 }}>
        <Calendar
          style={{
            color: neon,
            borderRadius: 20,
            elevation: 0,
            margin: 10,
            padding: 20,
            backgroundColor: bgLight,
          }}
        />
      </View>

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingVertical: 50,
        }}>
        <TouchableOpacity>
          <FetchQuote />
        </TouchableOpacity>
      </View>

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingHorizontal: 30,
          paddingVertical: 80,
        }}>
        <TouchableOpacity
          style={{
            backgroundColor: bgLight,
            paddingVertical: 20,
            paddingHorizontal: 20,
            borderRadius: 30,
          }}
          onPress={handleCheckIn}>
          <Text style={{ color: COLORS.lightWhite, fontWeight: 'bold' }}>
            {' '}
            CheckIN{' '}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            backgroundColor: bgLight,
            paddingVertical: 20,
            paddingHorizontal: 20,
            borderRadius: 30,
          }}
          onPress={() => {
            //  code that Handle checkout button press
          }}>
          <Text style={{ color: COLORS.lightWhite, fontWeight: 'bold' }}>
            {' '}
            CheckOUT{' '}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Attendance;
