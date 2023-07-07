import { View, Text, TouchableNativeFeedbackComponent } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import axios from './constants/Axios';
import React, { useState, useEffect } from 'react';
import Background from './components/Background';
import { neon, bgColor } from './constants/Constants';
import Field from './components/Field';
import Btn from './components/Btn';

const ProfileSetup = () => {
  const [formData, setFormData] = useState({
    weight: '70',
    height: '10',
    plan: '',
  });

  const handleProfileSetup = async () => {
    const { weight, height, plan } = formData;

    axios
      .post('/userProfile', {
        weight,
        height,
        // plan,
      })
      .then((response) => {
        alert('Setup successful');
        const user = response.data.data;
        console.log('Response:', user);
      })
      .catch((error) => {
        // alert('Setup failed');
        console.error('Error:', error);
      });
  };

  const handleInputChange = (field, value) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [field]: value,
    }));
  };

  return (
    <Background>
      <View style={{ alignItems: 'center' }}>
        <Text
          style={{
            color: 'white',
            fontSize: 64,
            fontWeight: 'bold',
            marginTop: 50,
            marginRight: 30,
          }}>
          Welcome
        </Text>
        <Text
          style={{
            color: 'white',
            fontSize: 19,
            fontWeight: 'bold',
            marginBottom: 20,
            marginRight: 30,
          }}>
          Setup you profile😉
        </Text>
      </View>
      <View
        style={{
          backgroundColor: bgColor,
          height: 700,
          width: 400,
          borderTopLeftRadius: 130,
          paddingTop: 50,
          alignItems: 'center',
        }}>
        <Field
          placeholder="Height"
          value={formData.height}
          onChangeText={(value) => handleInputChange('height', value)}
        />
        <Field
          placeholder="Weight"
          value={formData.weight}
          onChangeText={(value) => handleInputChange('weight', value)}
        />
        <Btn
          textColor={bgColor}
          bgColor={neon}
          btnLabel="Update"
          Press={handleProfileSetup}
        />
      </View>
    </Background>
  );
};

export default ProfileSetup;
