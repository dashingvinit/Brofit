import React, { useState, useEffect } from 'react';
import * as SecureStore from 'expo-secure-store';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from 'react-native';
import { bgColor, bgLight, neon } from './constants/Constants';
import axios from './constants/Axios';
import { SafeAreaView } from 'react-native-safe-area-context';

const PlanUpdate = () => {  const getPlans = async () => {
    try {
      const userString = await SecureStore.getItemAsync('user');
      const user = JSON.parse(userString);
      const gymId = user.gymId;
      console.log('gymId: ' + gymId);
      const response = await axios.get(`/gym/${gymId}`);
      const data = response.data;
      setPlans(data.data.plans);
    } catch (error) {
      console.log('plans Owner: ' + error);
    }
  };

  useEffect(() => {
    getPlans();
  }, []);




  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: bgColor, paddingBottom: 100 }}>
      <ScrollView>
        <View>
            <Text>
                hello
                
            </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default PlanUpdate
