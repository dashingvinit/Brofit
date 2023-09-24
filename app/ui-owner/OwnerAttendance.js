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
import DatePicker from 'react-native-modern-datepicker'; // Assuming you have this library installed
import { getFormatedDate } from 'react-native-modern-datepicker'; // Assuming you have this library installed

const OwnerAttendance = (props) => {
  const [attendanceData, setAttendanceData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [found, setfound] = useState(false);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const today = new Date();
  const startDate = getFormatedDate(today.setDate(today.getDate()+1), 'YYYY/MM/DD');
  const [startedDate, setStartedDate] = useState('');
  const [selectedStartDate, setSelectedStartDate] = useState(startedDate);

  const handleChangeStartDate = (propDate) => {
    setStartedDate(propDate);
    setStartedDate(propDate);
  };

  const searchAttendance = async () => {
    try {
      setIsLoading(true);
      const userString = await SecureStore.getItemAsync('user');
      const user = JSON.parse(userString);
      const Id = user.gymId;
      console.log(startedDate);
      const [year, month, day] = startedDate.split('/');
      // console.log(year)
      // console.log(month)
      // console.log(day)
      // setSearchYear(year);
      // console.log(searchYear);
      // setSearchMonth(month);
      // setSearchDay(day);
      const date = `${day}-${month}-${year}`;
      console.log(date)
      const response = await axios.get(`attendance/${Id}/${date}`);
      const data = response.data.data;
      console.log(data)
      setAttendanceData(data);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      if (error.response && error.response.status === 404) {
        setfound(true);
        setAttendanceData([]);
        console.log(error);
      } else {
        console.error('Error fetching attendance data:', error);
      }
    }
    setSelectedStartDate('')
  };

  const handleTextPress = () => {
    setDatePickerVisibility(!isDatePickerVisible);
  };

  const handleTextPress1 = () => {
    setDatePickerVisibility(!isDatePickerVisible);
    searchAttendance();
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

  // const handleDateSelected = () => {
  //   console.log('Selected Date:', selectedStartDate);
  // };

  return (
    <GradientBG>
      <SafeAreaView style={{ flex: 1 }}>
        <TopBack>Attendance</TopBack>
        <View style={styles.inputContainer}>
          <TouchableOpacity onPress={handleTextPress}>
            <TextInput
              style={styles.input}
              placeholder="Select a date to Search"
              placeholderTextColor={neon}
              value={selectedStartDate}
              editable={false}
            />
          </TouchableOpacity>
          <Modal
            visible={isDatePickerVisible}
            transparent
            onRequestClose={() => setDatePickerVisibility(false)}
          >
            <View style={{flex:1,alignItems:'center',justifyContent:'center',backgroundColor: 'rgba(0,0,0, 0.5)'}}>
              <View style={styles.modalContainer}>
                <DatePicker
                  mode="calendar"
                  minimumDate={null}
                  selected={startedDate}
                  onDateChanged={handleChangeStartDate}
                  onSelectedChange={(date) => {
                    setSelectedStartDate(date);
                    setStartedDate(date);
                  }}
                  options={{
                    backgroundColor:"#080516",
                    textHeaderColor: "#469ab6",
                    textDefaultColor: "#FFFFFF",
                    selectedTextColor: "#FFF",
                    maincolor: "#469ab6",
                    borderColor:'rgba(122,146,165,0.1)',
                    textSecondaryColor: "#FFFFFF",
                  }}    
                />
                <TouchableOpacity onPress={handleTextPress1} style={{paddingBottom:15}}>
                  <Text style={{color:"white"}}>Done</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
          {/* <TouchableOpacity style={styles.searchBtn} onPress={searchAttendance}>
            <Text style={{ color: neon, fontWeight: 'bold' }}>Search</Text>
          </TouchableOpacity> */}
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
    width: 300,
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
  modalContainer: {
    backgroundColor: '#080516',
    borderRadius: 25,
    margin: 20,
    paddingTop:35,
    alignItems: 'center',
    justifyContent:'center',
    width:'90%',
    shadowColor:"#000",
    shadowOffset:{
      height:2,
      width:0
    }
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
