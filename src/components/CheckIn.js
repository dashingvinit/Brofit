import { View, Text, TouchableOpacity } from 'react-native';
import { bgColor, neon, bgLight } from '../constants/Constants';
import { Location, Permissions } from 'expo';
import axios from '../constants/Axios';
import React, { useState, useEffect } from 'react';

const CheckIn = ({ checkINStatus }) => {
  const [userLocation, setUserLocation] = useState(null);
  const [disableButton, setDisableButton] = useState(true);

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
      const response = await axios.post('/attendance');
      checkINStatus();
      console.log(response);
      alert('CheckIN Done');
    } catch (error) {
      console.log(error);
      alert('Error: ' + error);
    }
  };

  return (
    <View>
      <TouchableOpacity
        style={{
          backgroundColor: neon,
          paddingVertical: 20,
          paddingHorizontal: 20,
          borderRadius: 30,
        }}
        // disabled={disableButton}
        onPress={handleCheckIn}>
        <Text style={{ color: bgColor, fontWeight: 'bold' }}>CheckIN</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CheckIn;
