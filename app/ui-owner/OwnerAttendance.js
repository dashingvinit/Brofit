import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Modal,
  StyleSheet,
} from 'react-native';
import { bgGlass, bgGlassLight, neon } from '../constants/Constants';
import { GradientBG, TopBack, Announcement, MsgModal } from '../components';
import { SafeAreaView } from 'react-native-safe-area-context';
import axios from '../constants/Axios';
import * as SecureStore from 'expo-secure-store';
import Ionicons from 'react-native-vector-icons/Ionicons';
import LottieView from 'lottie-react-native';

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
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            keyboardType="number-pad"
            placeholder="05"
            onChangeText={(text) => setSearchDay(text)}
            value={searchDay}
            maxLength={2}
          />
          <Text style={styles.slash}>/</Text>
          <TextInput
            style={styles.input}
            keyboardType="number-pad"
            placeholder="08"
            onChangeText={(text) => setSearchMonth(text)}
            value={searchMonth}
            maxLength={2}
          />
          <Text style={styles.slash}>/</Text>
          <TextInput
            style={styles.input}
            keyboardType="number-pad"
            placeholder="2023"
            onChangeText={(text) => setSearchYear(text)}
            value={searchYear}
            maxLength={4}
          />
          <TouchableOpacity style={styles.searchBtn} onPress={searchAttendance}>
            <Text style={{ color: neon, fontWeight: 'bold' }}>Search</Text>
          </TouchableOpacity>
        </View>
        <ScrollView>
          {!attendanceData.length && !isLoading && (
            <>
              <View
                style={{
                  alignItems: 'center',
                }}>
                <LottieView
                  source={require('../assets/lottieFiles/searchExplain.json')}
                  autoPlay
                  loop
                  style={{ width: 200, height: 200 }}
                />
                <Text style={styles.label}>
                  Search for a date to view the attendance of that day.
                </Text>
              </View>
              <Announcement navigation={props.navigation} />
            </>
          )}
        </ScrollView>
        {isLoading ? (
          <View
            style={{
              flex: 1,
              alignItems: 'center',
            }}>
            <LottieView
              source={require('../assets/lottieFiles/searchSkeleton.json')}
              autoPlay
              loop
              style={{ width: 400, height: 400 }}
            />
            {/* <ActivityIndicator size="large" color={neon} /> */}
          </View>
        ) : (
          attendanceData.length > 0 && (
            <>
              <View style={styles.dataContainer}>
                <Text style={styles.heading}>Attendance Data</Text>
                <View style={styles.labelContainer}>
                  <Text style={styles.label}>Name</Text>
                  <Text style={styles.label}>ID</Text>
                </View>
              </View>
              <ScrollView>
                <View style={{ flex: 1, paddingBottom: 100 }}>
                  <ScrollView style={styles.scrollContainer}>
                    {attendanceData.map((dataEntry, index) => (
                      <TouchableOpacity
                        key={index}
                        onPress={() => handlePress(dataEntry.userId)}>
                        <View style={styles.userContainer}>
                          <Ionicons
                            name="person"
                            color={neon}
                            size={24}
                            marginRight={10}
                          />
                          <Text style={styles.name}>
                            {dataEntry.userId.name}
                          </Text>
                          <Text style={styles.regId}>
                            {dataEntry.userId.registerationNumber}
                          </Text>
                        </View>
                      </TouchableOpacity>
                    ))}
                  </ScrollView>
                </View>
              </ScrollView>
            </>
          )
        )}
        <Modal
          visible={found}
          transparent
          onRequestClose={() => setfound(false)}>
          <MsgModal message={'Oops, No Data 😔'} />
        </Modal>
      </SafeAreaView>
    </GradientBG>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingBottom: 15,
    paddingHorizontal: 10,
  },
  input: {
    backgroundColor: bgGlassLight,
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 12,
    color: neon,
    textAlign: 'center',
  },
  slash: {
    color: neon,
    fontSize: 34,
    marginHorizontal: 10,
  },
  searchBtn: {
    backgroundColor: bgGlass,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
    marginLeft: 20,
    paddingVertical: 5,
    paddingHorizontal: 15,
  },
  dataContainer: {
    backgroundColor: bgGlassLight,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    width: '100%',
  },
  heading: {
    color: 'white',
    fontSize: 20,
    textAlign: 'center',
    marginVertical: 10,
  },
  labelContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: bgGlass,
    borderRadius: 15,
    paddingVertical: 10,
    margin: 5,
  },
  label: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginHorizontal: 10,
    textAlign: 'center',
  },
  scrollContainer: {
    backgroundColor: bgGlassLight,
    height: '100%',
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
  },
  userContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  name: {
    flex: 1,
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  regId: {
    color: neon,
    fontSize: 20,
    fontWeight: 'bold',
  },
});
export default OwnerAttendance;
