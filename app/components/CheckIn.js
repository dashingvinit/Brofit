import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
} from 'react-native';
import { bgColor, neon, bgLight } from '../constants/Constants';
import * as Location from 'expo-location';
import axios from '../constants/Axios';
import React, { useState, useEffect } from 'react';
import LottieView from 'lottie-react-native';

const CheckIn = ({ checkINStatus }) => {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [checkInMsg, setCheckInMsg] = useState(null);
  const [disableButton, setDisableButton] = useState(false);
  const [Loading, setLoading] = useState(false);

  let targetLocation = { latitude: 30.7440291, longitude: 76.6389241 };

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }
      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
      //console.log(location);
    })();
  }, []);

  useEffect(() => {
    if (location) {
      const latitudeDifference = Math.abs(
        location.coords.latitude - targetLocation.latitude
      );
      const longitudeDifference = Math.abs(
        location.coords.longitude - targetLocation.longitude
      );
      // Convert degree differences to meters
      const latitudeInMeters = latitudeDifference * 111139;
      const longitudeInMeters = longitudeDifference * 111139;
      // Check if within 5 meters
      if (latitudeInMeters < 5 && longitudeInMeters < 5) {
        setDisableButton(false);
      } else {
        setDisableButton(true);
      }
    }
  }, [location, targetLocation]);

  const handleCheckIn = async () => {
    try {
      setLoading(true);
      const response = await axios.post('/attendance');
      checkINStatus();
      alert('Checked IN');
      setLoading(false);
      setDisableButton(false);
    } catch (error) {
      if (error.response && error.response.status === 500) {
        alert('Internal Server Error: Please try again later.');
        setLoading(false);
      }
      if (error.response && error.response.status === 403) {
        alert('Already Checked IN');
        setLoading(false);
      } else {
        alert('Error: ' + error);
        setLoading(false);
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
        disabled={disableButton}
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
