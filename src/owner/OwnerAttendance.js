import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { bgColor, bgLight, neon } from '../constants/Constants';
import { SafeAreaView } from 'react-native-safe-area-context';
import axios from '../constants/Axios';
import * as SecureStore from 'expo-secure-store';

const OwnerAttendance = () => {
  const [searchDate, setSearchDate] = useState('');
  const [attendanceData, setAttendanceData] = useState(null);

  const searchAttendance = async () => {
    try {
      const userString = await SecureStore.getItemAsync('user');
      const user = JSON.parse(userString); 
      const Id = user.gymId;
      const response = await axios.get(`attendance/dayWiseAttendance/${Id}?date=${searchDate}`);
      setAttendanceData(response.data);
      console.log(reponse.data)
    } catch (error) {
        if (error.response && error.response.status === 404) {
            alert('Data not found.');
        }
        else{
            console.error('Error fetching attendance data:', error); }
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: bgColor, padding: 16 }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 20,paddingHorizontal:120, color:"white" }}>
        Attendance
      </Text>
      <View style={{flexDirection:'row', marginHorizontal:20}}>
        <TextInput
            style={{
            backgroundColor:bgLight,
            padding: 8,
            marginBottom: 16,
            width:250,
            borderRadius: 12,
            height:50,
            color:neon,
            }}
            keyboardType={
                Platform.OS === 'android'
                  ? 'phone-pad'
                  : Platform.OS === 'ios'
                  ? 'number-pad'
                  : 'numbers-and-punctuation'
              }
            placeholder={searchDate}
            onChangeText={(text) => setSearchDate(text)}
            value={searchDate}
        />
        <TouchableOpacity
            style={{
            backgroundColor: bgLight,
            paddingHorizontal: 12,
            paddingVertical: 12,
            alignItems: 'center',
            borderRadius: 12,
            marginLeft:20,
            height:50,
            width:80,
            }}
            onPress={searchAttendance}
        >
            <Text style={{ color: neon, fontWeight: 'bold' }}>Search</Text>
        </TouchableOpacity>
      </View>
      {attendanceData && (
        <View style={{ marginTop: 20 }}>
          <Text>Attendance Data:</Text>
          <Text>{JSON.stringify(attendanceData, null, 2)}</Text>
        </View>
      )}
    </SafeAreaView>
  );
};

export default OwnerAttendance;
