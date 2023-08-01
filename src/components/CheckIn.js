import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { bgColor, neon, bgLight } from '../constants/Constants';
import { Location, Permissions } from 'expo';
import axios from '../constants/Axios';
import React, { useState, useEffect } from 'react';
import LottieView from 'lottie-react-native';

const CheckIn = ({ checkINStatus}) => {
  const [userLocation, setUserLocation] = useState(null);
  const [disableButton, setDisableButton] = useState(true);
  const[Loading, setLoading] = useState(false)

  const targetLocation = { latitude: 12.3456, longitude: 78.9101 };

  // const getPermission = async () => {
  //   const { status } = await Permissions.askForegroundPermissionsAsync();
  //   if (status !== 'granted') {
  //     alert('Permission to access location was denied');
  //     return; 
  //   }

  //   const location = await Location.getCurrentPositionAsync({});
  //   setUserLocation(location.coords);
  // };

  // useEffect(() => {
  //   getPermission();
  // }, []);

  // useEffect(() => {
  //   if (userLocation && targetLocation) {
  //     const distance = Location.distanceBetween(
  //       userLocation.latitude,
  //       userLocation.longitude,
  //       targetLocation.latitude,
  //       targetLocation.longitude
  //     );

  //     setDisableButton(distance > 100);
  //   }
  // }, [userLocation]);

  const handleCheckIn = async () => {
    try {
      setLoading(true);
      setDisableButton(true);
      const response = await axios.post('/attendance');
      checkINStatus();
      alert('Checked IN');
      setLoading(false);
      setDisableButton(false);
    } catch (error) {
      if (error.response && error.response.status === 500) {
        alert('Internal Server Error: Please try again later.');
      } else {
        console.log('Error: ' + error.message);
        alert('You are not in the gym');
      }
    }
  };

  return (
    <View>
      <TouchableOpacity
        style={{
          marginRight: 5,
          backgroundColor: neon,
          paddingVertical: 20,
          paddingHorizontal: 40,
          borderRadius: 30,
          width: 150,
        }}
        // disabled={disableButton}
        onPress={handleCheckIn}>
        <Text style={{ color: bgColor, fontWeight: 'bold' }}>CheckIN</Text>
      </TouchableOpacity>
      {Loading && (
        <View
          style={{
            position: 'absolute',
            top: -600,
            bottom: 30,
            left: '-20%',
            right: '-120%',
            backgroundColor: 'rgba(0, 0, 0, 0)',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <LottieView
            source={require('../assets/lottieFiles/loadingSkeliton.json')}
            autoPlay
            loop
          />
        </View>
      )}
    </View>
  );
};

export default CheckIn;
