import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import axios from './constants/Axios';
import { Calendar } from 'react-native-calendars';
import { COLORS } from './constants';
import FetchQuote from './components/FetchQuote';;

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
    <View style={{ flex: 1, backgroundColor: COLORS.black, paddingTop: 80 }}>
      <View style={{ flex: 1 }}>
        <Calendar
          style={{
            borderRadius: 25,
            elevation: 4,
            margin: 10,
            backgroundColor: COLORS.gray,
          }}
        />
      </View>

      {/* Fitness Quotes */}

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingVertical: 130,
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
          paddingVertical: 20,
        }}>
        <TouchableOpacity
          style={{
            backgroundColor: COLORS.gray3,
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
            backgroundColor: COLORS.gray3,
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
