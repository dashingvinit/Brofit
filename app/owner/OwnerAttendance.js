import React, { useState,useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Image,
  Modal,
} from 'react-native';
import {
  bgColor,
  bgGlass,
  bgGlassLight,
  bgLight,
  neon,
} from '../constants/Constants';
import { GradientBG, Top, TopBack } from '../components';
import { SafeAreaView } from 'react-native-safe-area-context';
import axios from '../constants/Axios';
import * as SecureStore from 'expo-secure-store';
import Userprofile from './UserProfile';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { G } from 'react-native-svg';
import MsgModal from '../components/MsgModal';

const OwnerAttendance = (props) => {
  const [searchDay, setSearchDay] = useState('');
  const [searchMonth, setSearchMonth] = useState('');
  const [searchYear, setSearchYear] = useState('');
  const [attendanceData, setAttendanceData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [found, setfound] = useState(false);

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
        setfound(true);
        console.log(error);
      } else {
        console.error('Error fetching attendance data:', error);
      }
    }
  };

  const handlePress = async (user) => {
    props.navigation.navigate('UserProfile', { user });
  };

  useEffect(() => {
    if (found) {
      const timeout = setTimeout(() => {
        setfound(false);
      }, 2000);
      return () => clearTimeout(timeout);
    }
  }, [found]);

  return (
    <GradientBG>
      <SafeAreaView style={{ flex: 1 }}>
        <TopBack>Attendance</TopBack>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            paddingTop: 10,
          }}>
          <TextInput
            style={{
              backgroundColor: bgGlassLight,
              paddingVertical: 10,
              paddingHorizontal: 15,
              marginBottom: 16,
              borderRadius: 12,
              color: neon,
              textAlign: 'center',
            }}
            keyboardType="number-pad"
            placeholder="05"
            onChangeText={(text) => setSearchDay(text)}
            value={searchDay}
            maxLength={2}
          />
          <Text style={{ color: neon, fontSize: 34, marginHorizontal: 10 }}>
            /
          </Text>
          <TextInput
            style={{
              backgroundColor: bgGlassLight,
              paddingVertical: 10,
              paddingHorizontal: 15,
              marginBottom: 16,
              borderRadius: 12,
              color: neon,
              textAlign: 'center',
            }}
            keyboardType="number-pad"
            placeholder="08"
            onChangeText={(text) => setSearchMonth(text)}
            value={searchMonth}
            maxLength={2}
          />
          <Text style={{ color: neon, fontSize: 34, marginHorizontal: 10 }}>
            /
          </Text>
          <TextInput
            style={{
              backgroundColor: bgGlassLight,
              paddingVertical: 10,
              paddingHorizontal: 15,
              marginBottom: 16,
              borderRadius: 12,
              color: neon,
              textAlign: 'center',
            }}
            keyboardType="number-pad"
            placeholder="2023"
            onChangeText={(text) => setSearchYear(text)}
            value={searchYear}
            maxLength={4}
          />
          <TouchableOpacity
            style={{
              backgroundColor: bgGlass,
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
                      flex: 0.5,
                      marginLeft: 40,
                    }}>
                    ID
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
                    {attendanceData.map((dataEntry, index) => (
                      <TouchableOpacity
                        key={index}
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
                                flex: 1,
                                color: neon,
                                fontSize: 20,
                                marginLeft: 20,
                              }}>
                              {dataEntry.userId.name}
                            </Text>
                            <Text
                              style={{
                                color: neon,
                                fontSize: 20,
                                marginLeft: 20,
                                flex: 0.5,
                              }}>
                              {dataEntry.userId.registerationNumber}
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
        <Modal visible={found} transparent onRequestClose={() => setfound(false)}>
            <MsgModal message={'Oops, No Data 😔'} />
        </Modal>
      </SafeAreaView>
    </GradientBG>
  );
};

export default OwnerAttendance;