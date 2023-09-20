import { View, Text, TouchableOpacity, Modal, StyleSheet } from 'react-native';
import { bgColor, neon } from '../../constants/Constants';
import * as Location from 'expo-location';
import axios from '../../constants/Axios';
import React, { useState, useEffect } from 'react';
import LottieView from 'lottie-react-native';
import MsgModal from '../../components/layout/MsgModal';
import * as SecureStore from 'expo-secure-store';

const CheckIn = ({ setAttendance }) => {
  const [location, setLocation] = useState(null);
  const [targetLocation, setTargetLocation] = useState(null);
  const [disableButton, setDisableButton] = useState(true);
  const [Loading, setLoading] = useState(false);
  const [already, setAlready] = useState(false);
  const [check, setCheck] = useState(false);

  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const earthRadius = 6371000; // Earth's radius in meters
    const dLat = Math.abs(degToRad(lat2 - lat1));
    const dLon = Math.abs(degToRad(lon2 - lon1));
    // console.log(dLat);
    // console.log(dLon);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(degToRad(lat1)) *
        Math.cos(degToRad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = earthRadius * c;
    return distance;
  };

  const degToRad = (deg) => {
    return deg * (Math.PI / 180);
  };

  const isUserWithinThreshold = (
    userLat,
    userLon,
    gymLat,
    gymLon,
    threshold
  ) => {
    const distance = calculateDistance(userLat, userLon, gymLat, gymLon);
    //console.log(distance);
    return distance <= threshold;
  };

  useEffect(() => {
    const getLocation = async () => {
      try {
        const userString = await SecureStore.getItemAsync('user');
        const user = JSON.parse(userString);
        const Id = user.gymId;
        const response = await axios.get(`/gym/location/${Id}`);
        const targetLocation = {
          latitude: response.data.data.latitude,
          longitude: response.data.data.longitude,
        };
        setTargetLocation(targetLocation);
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          return;
        }
        try {
          let location = await Location.getCurrentPositionAsync({});
          setLocation(location);
        } catch (error) {
          console.error('Error getting current location:', error);
        }
      } catch (error) {
        console.error('Error fetching target location:', error);
      }
    };
    getLocation();
  }, []);

  useEffect(() => {
    // console.log(location);
    // console.log(targetLocation);
    if (location && targetLocation) {
      // console.log('hel');
      const userLatitude = location.coords.latitude;
      const userLongitude = location.coords.longitude;
      const gymLatitude = targetLocation.latitude;
      const gymLongitude = targetLocation.longitude;
      const thresholdDistance = 100; // 100 meters

      const isWithinThreshold = isUserWithinThreshold(
        userLatitude,
        userLongitude,
        gymLatitude,
        gymLongitude,
        thresholdDistance
      );

      if (isWithinThreshold) {
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
      setAttendance('Checked In ' + response.data.data.checkIn);
      const attendance = JSON.stringify(response.data.data);
      //console.log(attendance);
      await SecureStore.setItemAsync('attendance', attendance);
      setCheck(true);
      setLoading(false);
      setDisableButton(false);
    } catch (error) {
      if (error.response && error.response.status === 500) {
        alert('Internal Server Error: Please try again later.');
        setLoading(false);
      }
      if (error.response && error.response.status === 403) {
        setAttendance('Already Checked In');
        setAlready(true);
        setLoading(false);
      } else {
        alert('Error: ' + error);
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    if (already) {
      const timeout = setTimeout(() => {
        setAlready(false);
      }, 1000);
      return () => clearTimeout(timeout);
    }
  }, [already]);

  useEffect(() => {
    if (check) {
      const timeout = setTimeout(() => {
        setCheck(false);
      }, 1000);
      return () => clearTimeout(timeout);
    }
  }, [check]);

  return (
    <View>
      <TouchableOpacity
        style={disableButton ? disabledButtonStyle : enabledButtonStyle}
        disabled={disableButton}
        onPress={handleCheckIn}>
        {disableButton ? (
          <LottieView
            source={require('../../assets/lottieFiles/loadingcircles.json')}
            autoPlay
            loop
            style={{ height: 20, width: 25 }}
          />
        ) : (
          <Text style={{ color: bgColor, fontWeight: 'bold' }}>Check In</Text>
        )}
      </TouchableOpacity>
      {Loading && (
        <View style={styles.loadingScreen}>
          <LottieView
            source={require('../../assets/lottieFiles/loadingSkeliton.json')}
            autoPlay
            loop
          />
        </View>
      )}
      <Modal
        visible={already}
        transparent
        onRequestClose={() => setAlready(false)}>
        <MsgModal message={'Already checkin 💪🏻'} />
      </Modal>
      <Modal visible={check} transparent onRequestClose={() => setCheck(false)}>
        <MsgModal message={'Get started 😉'} />
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  loadingScreen: {
    position: 'absolute',
    top: -600,
    bottom: 30,
    left: '-20%',
    right: '-120%',
    backgroundColor: 'rgba(0, 0, 0, 0)',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
const buttonStyle = {
  marginRight: 5,
  paddingVertical: 20,
  paddingHorizontal: 40,
  borderRadius: 30,
  width: 150,
  justifyContent: 'center',
  alignItems: 'center',
};

// Define styles for different states of the button
const enabledButtonStyle = {
  ...buttonStyle,
  backgroundColor: neon,
};

const disabledButtonStyle = {
  ...buttonStyle,
  backgroundColor: 'gray', // Change this color to your desired color for disabled state
};

export default CheckIn;
