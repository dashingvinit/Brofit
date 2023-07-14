import { View, Text, TouchableOpacity } from 'react-native';
import axios from '../constants/Axios';
import { bgColor, neon, bgLight } from '../constants/Constants';
import React, { useState } from 'react';

const CheckOut = async () => {
  //   const checkout = async () => {
  //     try {
  //       const response = await axios.post('/attendance');
  //       alert('Done');
  //       // fetchAttendanceData();
  //     } catch (error) {
  //       if (error.response && error.response.status === 500) {
  //         alert('Internal Server Error: Please try again later.');
  //       } else {
  //         alert('Error: ' + error.message);
  //       }
  //     }
  //   };

  return (
    <View>
      <TouchableOpacity
        style={{
          backgroundColor: bgLight,
          paddingVertical: 20,
          paddingHorizontal: 20,
          borderRadius: 30,
        }}
        //   onPress={CheckOut}
      >
        <Text style={{ color: 'white', fontWeight: 'bold' }}>CheckOUT</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CheckOut;
