import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Image,
} from 'react-native';
import { bgColor, bgLight, neon } from '../constants/Constants';
import { SafeAreaView } from 'react-native-safe-area-context';
import axios from '../constants/Axios';
import * as SecureStore from 'expo-secure-store';
import Userprofile from './UserProfile';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useIsFocused } from '@react-navigation/native';

const OwnerAttendance = (props) => {
  const [searchDay, setSearchDay] = useState('');
  const [searchMonth, setSearchMonth] = useState('');
  const [searchYear, setSearchYear] = useState('');
  const [attendanceData, setAttendanceData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const searchAttendance = async () => {
    try {
      setIsLoading(true);
      const userString = await SecureStore.getItemAsync('user');
      const user = JSON.parse(userString);
      const Id = user.gymId;
      const date = `${searchDay}-${searchMonth}-${searchYear}`;
      const response = await axios.get(`attendance/${Id}/${date}`);
      const data = response.data.data;
      setAttendanceData(data);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
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
          alignSelf: 'center',
          color: 'white',
        }}>
        Attendance
      </Text>
      <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
        <TextInput
          style={{
            backgroundColor: bgLight,
            paddingVertical: 10,
            paddingHorizontal: 15,
            marginBottom: 16,
            borderRadius: 12,
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
            paddingVertical: 10,
            paddingHorizontal: 15,
            marginBottom: 16,
            borderRadius: 12,
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
            paddingVertical: 10,
            paddingHorizontal: 15,
            marginBottom: 16,
            borderRadius: 12,
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

      {!attendanceData.length && !isLoading && (
        <View style={{ marginLeft: 20, marginVertical: 80 }}>
          <Image
            source={require('../assets/images/dumbell.gif')}
            style={{ width: 300, height: 300 }}
          />
          <Text
            style={{
              fontSize: 28,
              fontWeight: 'bold',
              color: 'white',
              textAlign: 'center',
              marginVertical: 50,
            }}>
            Data need to be searched
          </Text>
        </View>
      )}

      {isLoading ? (
        <ActivityIndicator size="large" color={neon} />
      ) : (
        attendanceData.length > 0 && (
          <ScrollView>
            <View>
              <View
                style={{
                  backgroundColor: bgLight,
                  borderRadius: 25,
                  width: 240,
                  alignItems: 'center',
                  alignSelf: 'center',
                }}>
                <Text
                  style={{
                    color: 'white',
                    fontSize: 20,
                    textAlign: 'center',
                    paddingVertical: 20,
                  }}>
                  Attendance Data
                </Text>
              </View>

              {/* Adding fixed headings for Name, Check-in, and Check-out */}
              <View
                style={{
                  flexDirection: 'row',
                  marginHorizontal: 8,
                  marginTop: 30,
                  marginBottom: 5,
                  backgroundColor: bgLight,
                  borderRadius: 25,
                  height: 50,
                  paddingTop: 10,
                }}>
                <Text
                  style={{
                    color: 'white',
                    fontSize: 18,
                    flex: 1,
                    marginLeft: 30,
                  }}>
                  Name
                </Text>
                <Text
                  style={{
                    color: 'white',
                    fontSize: 18,
                    flex: 1,
                    marginLeft: 40,
                  }}>
                  Check-in
                </Text>
                <Text
                  style={{
                    color: 'white',
                    fontSize: 18,
                    flex: 1,
                    marginLeft: 40,
                  }}>
                  Check-out
                </Text>
              </View>
              <ScrollView>
                <View
                  style={{
                    backgroundColor: bgLight,
                    borderRadius: 25,
                    marginTop: 20,
                    marginBottom: 60,
                  }}>
                  {attendanceData.map((dataEntry) => (
                    <TouchableOpacity
                      key={dataEntry._id}
                      onPress={() => handlePress(dataEntry.userId)}>
                      <View
                        style={{
                          height: 50,
                          marginHorizontal: 10,
                          marginVertical: 20,
                        }}>
                        <View style={{ flexDirection: 'row' }}>
                          <Ionicons
                            name="person"
                            color={neon}
                            size={20}
                            marginLeft={10}
                          />
                          <Text
                            style={{
                              color: neon,
                              fontSize: 20,
                              marginLeft: 20,
                            }}>
                            {dataEntry.userId.name}
                          </Text>
                        </View>
                      </View>
                    </TouchableOpacity>
                  ))}
                </View>
              </ScrollView>
            </View>
          </ScrollView>
        )
      )}
    </SafeAreaView>
  );
};

export default OwnerAttendance;
