import React,{useEffect,useState} from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { FetchQuote, CheckIn } from './components';
import { bgColor, bgLight, neon } from './constants/Constants';
import axios from './constants/Axios';
import * as SecureStore from 'expo-secure-store';

const Attendance = () => {
  const [userData, setUserData] = useState(null); 
  const [markedDates, setMarkedDates] = useState({});

  const fetchattendance = async() => {
    try{
      const userString = await SecureStore.getItemAsync('user');
      const user = JSON.parse(userString); 
      const Id = user.userId;
      const response = await axios.get(`/userProfile/${Id}`);
      const data =await response.data;
      setUserData(data.data.attendance);

      const markedDatesObj = {};
      data.data.attendance.forEach((entry) => {
        const day = entry.day; 
        const formattedDay = day.split('-').reverse().join('-'); 
        markedDatesObj[formattedDay] = {
          customStyles: {
            container: {
              backgroundColor: 'blue', 
              borderRadius: 16,
            },
            text: {
              color: 'white', 
              fontWeight: 'bold',
              fontSize: 16,
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
          markedDates={markedDates}
          markingType={'custom'}
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
