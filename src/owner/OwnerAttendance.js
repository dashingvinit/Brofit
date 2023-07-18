import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { bgColor, bgLight, neon } from '../constants/Constants';
import { SafeAreaView } from 'react-native-safe-area-context';
import axios from '../constants/Axios';
import * as SecureStore from 'expo-secure-store';
import Userprofile from './UserProfile';

const OwnerAttendance = (props) => {
  const [searchDay, setSearchDay] = useState('');
  const [searchMonth, setSearchMonth] = useState('');
  const [searchYear, setSearchYear] = useState('');
  const [attendanceData, setAttendanceData] = useState([]);

  const searchAttendance = async () => {
    try {
      const userString = await SecureStore.getItemAsync('user');
      const user = JSON.parse(userString);
      const Id = user.gymId;
      const date = `${searchDay}-${searchMonth}-${searchYear}`;
      const response = await axios.get(`attendance/${Id}/${date}`);
      const data = response.data.data;
      console.log(data);
      setAttendanceData(data);
    } catch (error) {
      if (error.response && error.response.status === 404) {
        alert('Data not found.');
        console.log(error);
      } else {
        console.error('Error fetching attendance data:', error);
      }
    }
  };

  const handlePress = async (user) => {
    props.navigation.navigate('UserProfile', { user });
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: bgColor, padding: 16 }}>
      <Text
        style={{
          fontSize: 24,
          fontWeight: 'bold',
          marginBottom: 20,
          paddingHorizontal: 120,
          color: 'white',
        }}>
        Attendance
      </Text>
      <View style={{ flexDirection: 'row', marginHorizontal: 20 }}>
        <TextInput
          style={{
            backgroundColor: bgLight,
            padding: 8,
            marginBottom: 16,
            width: 60,
            borderRadius: 12,
            height: 50,
            color: neon,
            textAlign: 'center',
          }}
          keyboardType="number-pad"
          placeholder="DD"
          onChangeText={(text) => setSearchDay(text)}
          value={searchDay}
          maxLength={2}
        />
        <Text style={{ color: neon, fontSize: 34, marginHorizontal: 10 }}>
          /
        </Text>
        <TextInput
          style={{
            backgroundColor: bgLight,
            padding: 8,
            marginBottom: 16,
            width: 60,
            borderRadius: 12,
            height: 50,
            color: neon,
            textAlign: 'center',
          }}
          keyboardType="number-pad"
          placeholder="MM"
          onChangeText={(text) => setSearchMonth(text)}
          value={searchMonth}
          maxLength={2}
        />
        <Text style={{ color: neon, fontSize: 34, marginHorizontal: 10 }}>
          /
        </Text>
        <TextInput
          style={{
            backgroundColor: bgLight,
            padding: 8,
            marginBottom: 16,
            width: 80,
            borderRadius: 12,
            height: 50,
            color: neon,
            textAlign: 'center',
          }}
          keyboardType="number-pad"
          placeholder="YYYY"
          onChangeText={(text) => setSearchYear(text)}
          value={searchYear}
          maxLength={4}
        />
        <TouchableOpacity
          style={{
            backgroundColor: bgLight,
            paddingHorizontal: 12,
            paddingVertical: 12,
            alignItems: 'center',
            borderRadius: 12,
            marginLeft: 20,
            height: 50,
            width: 80,
          }}
          onPress={searchAttendance}>
          <Text style={{ color: neon, fontWeight: 'bold' }}>Search</Text>
        </TouchableOpacity>
      </View>
      {attendanceData.length > 0 && (
        <View style={{ marginTop: 20 }}>
          <View
            style={{
              backgroundColor: bgLight,
              borderRadius: 25,
              height: 70,
              width: 240,
              alignItems: 'center',
              marginHorizontal: 70,
            }}>
            <Text
              style={{
                color: 'white',
                fontSize: 20,
                textAlign: 'center',
                paddingHorizontal: 40,
                paddingVertical: 20,
              }}>
              Attendance Data
            </Text>
          </View>

          {attendanceData.map((dataEntry) => (
            <TouchableOpacity onPress={() => handlePress(dataEntry.userId)}>
              <View
                style={{
                  backgroundColor: bgLight,
                  borderRadius: 15,
                  height: 50,
                  width: 200,
                  alignItems: 'center',
                  marginHorizontal: 10,
                  marginVertical: 20,
                }}>
                <Text
                  key={dataEntry._id}
                  style={{ color: neon, fontSize: 20, paddingVertical: 10 }}>
                  {dataEntry.userId.name}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </SafeAreaView>
  );
};

export default OwnerAttendance;
