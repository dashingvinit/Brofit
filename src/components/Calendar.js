import { View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Calendar } from 'react-native-calendars';
import { bgColor, bgLight, neon } from '../constants/Constants';
import * as SecureStore from 'expo-secure-store';
import axios from '../constants/Axios';

const Calender = () => {
  const [userData, setUserData] = useState(null);
  const [markedDates, setMarkedDates] = useState({});

  const fetchattendance = async () => {
    try {
      const userString = await SecureStore.getItemAsync('user');
      const user = JSON.parse(userString);
      const Id = user.userId;
      const response = await axios.get(`/userProfile/${Id}`);
      const data = await response.data;
      setUserData(data.data.attendance);

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
      console.log(error);
    }
  };

  useEffect(() => {
    fetchattendance();
  }, []);
  return (
    <View>
      <Calendar
        style={{
          borderWidth: 0,
          borderRadius: 16,
          padding: 10,
        }}
        theme={{
          backgroundColor: bgLight,
          calendarBackground: bgLight,
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
