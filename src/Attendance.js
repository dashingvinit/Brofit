import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, Text, ScrollView, Alert, RefreshControl } from 'react-native';

import { FetchQuote, CheckIn, Calendar, GradientBG } from './components';
import { bgColor, bgLight, neon } from './constants/Constants';
import axios from './constants/Axios';
import * as SecureStore from 'expo-secure-store';
import LottieView from 'lottie-react-native';

const Attendance = () => {
  const [attendance, setAttendance] = useState();
  const [refreshing, setRefreshing] = useState(false);
  const [newloading, setnewLoading] = useState(false);

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  };

  const handleCheckin = async () => {
    setAttendance('Checked In');
  };

  const handleCheckout = async () => {
    Alert.alert(
      'Bro, Are you sure you want to leave ?',
      '',
      [
        {
          text: 'No',
          style: 'cancel',
        },
        {
          text: 'Yes',
          onPress: async () => {
            try {
              const userString = await SecureStore.getItemAsync('user');
              const user = JSON.parse(userString);
              const Id = user?.userId || user?._id;
              const response = await axios.patch(`/attendance/${Id}`);
              setAttendance('Checked Out');
              alert('Sucessfully checkedOut')
            } catch (error) {
              alert('Error: ' + error);
            }
          },
        },
      ],
      { cancelable: true }
    );
  };

  return (
    <GradientBG>
      <View style={{ flex: 1 }}>
      <ScrollView
        contentContainerStyle={{ paddingBottom: 160 }}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            color={'blue'}
          />
        }>
        <FetchQuote />
          {refreshing ? (
            <LottieView
            source={require('../src/assets/lottieFiles/graphLoading.json')} 
            autoPlay
            loop
            style={{ width: 300, height: 300, alignSelf: 'center', marginTop: 20 }}
          />
          ) : (
            <Calendar />
          )}
        </ScrollView>
        <View
          style={{
            marginTop: 20,
            alignItems: 'center',
            paddingBottom: 90,
            backgroundColor: 'black',
            borderTopLeftRadius: 30,
            borderTopRightRadius: 30,

            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
          }}>
          <Text
            style={{
              color: 'white',
              fontWeight: 'bold',
              fontSize: 18,
              padding: 20,
            }}>
            {attendance ? attendance : 'Not Checked In'}
          </Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingHorizontal: 30,
            }}>
            <CheckIn checkINStatus={handleCheckin} />

            <TouchableOpacity
              style={{
                marginLeft: 5,
                backgroundColor: bgLight,
                paddingVertical: 20,
                paddingHorizontal: 30,
                borderRadius: 30,
                width: 150,
              }}
              onPress={handleCheckout}>
              <Text style={{ color: 'white', fontWeight: 'bold' }}>
                {' '}
                CheckOUT{' '}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </GradientBG>
  );
};

export default Attendance;
