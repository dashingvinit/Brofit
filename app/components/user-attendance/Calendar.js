import { View, Text } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Calendar } from 'react-native-calendars';
import { bgColor, bgLight, neon } from '../../constants/Constants';
import * as SecureStore from 'expo-secure-store';
import axios from '../../constants/Axios';

const Calender = () => {
  const [markedDates, setMarkedDates] = useState({});

  const fetchattendance = async () => {
    try {
      const userString = await SecureStore.getItemAsync('user');
      const user = JSON.parse(userString);
      const Id = user?.userId || user?._id;
      const response = await axios.get(`/userProfile/calendar/${Id}`);
      // console.log(response.data);
      const data = await response.data;
      const markedDatesObj = {};
      data.data.attendance.forEach((entry) => {
        const day = entry.day;
        const formattedDay = day.split('-').reverse().join('-');
        markedDatesObj[formattedDay] = {
          customStyles: {
            container: {
              backgroundColor: neon,
              borderRadius: 16,
            },
            text: {
              color: bgColor,
              fontWeight: 'bold',
              fontSize: 18,
            },
          },
        };
      });
      setMarkedDates(markedDatesObj);
    } catch (error) {
      console.log('h' + error);
    }
  };

  useEffect(() => {
    fetchattendance();
  }, []);
  return (
    <View>
      <Calendar
        style={{
          borderWidth: 1,
          borderRadius: 30,
          borderColor: 'gray',
          padding: 10,
        }}
        theme={{
          backgroundColor: bgLight,
          calendarBackground: 'transparent',
          textSectionTitleColor: '#C0EEF2',
          selectedDayBackgroundColor: '#00adf5',
          selectedDayTextColor: '#ffffff',
          todayTextColor: '#00adf5',
          dayTextColor: '#CCFFBD',
          textDisabledColor: 'white',
          monthTextColor: 'white',
        }}
        markedDates={markedDates}
        markingType={'custom'}
      />
    </View>
  );
};

export default Calender;
