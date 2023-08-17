import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
  Modal,
  Pressable,
} from 'react-native';
import { bgColor, neon, bgLight } from '../constants/Constants';
import * as Location from 'expo-location';
import axios from '../constants/Axios';
import React, { useState, useEffect } from 'react';
import LottieView from 'lottie-react-native';
import MsgModal from './MsgModal';
import * as SecureStore from 'expo-secure-store';

const CheckIn = ({ checkINStatus }) => {
  const [location, setLocation] = useState(null);
  const [targetLocation, setTargetLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  const [checkInMsg, setCheckInMsg] = useState(null);
  const [disableButton, setDisableButton] = useState(true);
  const [Loading, setLoading] = useState(false);
  const [already, setalready] = useState(false);
  const [check, setcheck] = useState(false);

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
        //console.log(targetLocation);
        setTargetLocation(targetLocation);
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          setErrorMsg('Permission to access location was denied');
          return;
        }
        try {
          let location = await Location.getCurrentPositionAsync({});
          setLocation(location);
          console.log(location);
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
    if (location && targetLocation) {
      const latitudeDifference = Math.abs(
        location.coords.latitude - targetLocation.latitude
      );
      const longitudeDifference = Math.abs(
        location.coords.longitude - targetLocation.longitude
      );
      const latitudeInMeters = latitudeDifference * 111139;
      const longitudeInMeters = longitudeDifference * 111139;
      if (latitudeInMeters < 5 && longitudeInMeters < 5) {
        setDisableButton(false);
      } else {
        setDisableButton(true);
      }
    }
  }, [location, targetLocation]);

  useEffect(() => {
    if (already) {
      const timeout = setTimeout(() => {
        setalready(false);
      }, 1000);
      return () => clearTimeout(timeout);
    }
  }, [already]);

  useEffect(() => {
    if (check) {
      const timeout = setTimeout(() => {
        setcheck(false);
      }, 1000);
      return () => clearTimeout(timeout);
    }
  }, [check]);

  const handleCheckIn = async () => {
    try {
      setLoading(true);
      const response = await axios.post('/attendance');
      checkINStatus();
      setcheck(true);
      setLoading(false);
      setDisableButton(false);
    } catch (error) {
      if (error.response && error.response.status === 500) {
        alert('Internal Server Error: Please try again later.');
        setLoading(false);
      }
      if (error.response && error.response.status === 403) {
        setalready(true);
        setLoading(false);
        setLoading(false);
      }
      if (error.response && error.response.status === 403) {
        setalready(true);
        setLoading(false);
      } else {
        alert('Error: ' + error);
        setLoading(false);
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
      <Modal
        visible={already}
        transparent
        onRequestClose={() => setalready(false)}>
        <MsgModal message={'Not again, Bro💪🏻'} />
      </Modal>

      <Modal visible={check} transparent onRequestClose={() => setcheck(false)}>
        <MsgModal message={'Get started 😉'} />
      </Modal>
    </View>
  );
};

export default CheckIn;
