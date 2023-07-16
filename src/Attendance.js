import React,{useEffect} from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { FetchQuote, CheckIn } from './components';
import { bgColor, bgLight, neon } from './constants/Constants';
import axios from './constants/Axios';

const Attendance = () => {

  const fetchattendance = async() => {
    try{
      const response = await fetch('http://192.168.29.77:7000/api/v1/attendance');
      const data = response.json();
      console.log(data);
    }catch(error){
      console.log('h'+ error)
    }
  }

  useEffect(() => {
    fetchattendance();
  }, []);

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
        <CheckIn />

        <TouchableOpacity
          style={{
            backgroundColor: bgLight,
            paddingVertical: 20,
            paddingHorizontal: 20,
            borderRadius: 30,
          }}
          onPress={'soon'}>
          <Text style={{ color: 'white', fontWeight: 'bold' }}> CheckOUT </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Attendance;
