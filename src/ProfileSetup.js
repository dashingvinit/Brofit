import { View, Text } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import * as SecureStore from 'expo-secure-store';
import axios, { setTokenHeader } from './constants/Axios';
import React, { useEffect, useState } from 'react';
import Background from './components/Background';
import { neon, bgColor } from './constants/Constants';
import Field from './components/Field';
import Btn from './components/Btn';
import Plans from './components/Plans';

const ProfileSetup = (props) => {
  const setTokenHeader = async () => {
    const token = await SecureStore.getItemAsync('token');
    axios.interceptors.request.use((config) => {
      config.headers['x-access-token'] = token;
      return config;
    });
    console.log('Token set:', token);
  };

  setTokenHeader();

  const [formData, setFormData] = useState({
    weight: '70',
    height: '10',
    plan: 'no plan',
    age: 20,
    gender: 'other',
    address: 'Kathmandu',
  });

  const handleProfileSetup = async () => {
    const { weight, height, plan, gender, age } = formData;

    try {
      const response = await axios.post('/userProfile', formData);
      alert('Setup successful');
      const user = response.data.data;
      props.sethandleLogin();
      props.navigation.navigate('Home1');
      console.log('Response:', user);
    } catch (error) {
      alert('Setup failed');
      console.error('Error:', 'profilesetup', error);
    }
  };

  const handlePlanSelect = (plan) => {
    const selectedPlanName = plan._id;
    console.log(selectedPlanName);
    setFormData((prevFormData) => ({
      ...prevFormData,
      plan: selectedPlanName,
    }));
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
          Setup your profile😉
        </Text>
      </View>
      <View
        style={{
          backgroundColor: bgColor,
          height: 700,
          width: 400,
          borderTopLeftRadius: 130,
          paddingTop: 50,
          paddingBottom: 50,
          alignItems: 'center',
        }}>
        <Field
          keyboardType={
            Platform.OS === 'android'
              ? 'phone-pad'
              : Platform.OS === 'ios'
              ? 'number-pad'
              : 'numbers-and-punctuation'
          }
          placeholder="Height"
          value={formData.height}
          onChangeText={(value) => handleInputChange('height', value)}
        />

        <Field
          keyboardType={
            Platform.OS === 'android'
              ? 'phone-pad'
              : Platform.OS === 'ios'
              ? 'number-pad'
              : 'numbers-and-punctuation'
          }
          placeholder="Age"
          value={formData.age.toString()}
          onChangeText={(value) => handleInputChange('age', value)}
        />
        <Field
          keyboardType={
            Platform.OS === 'android'
              ? 'phone-pad'
              : Platform.OS === 'ios'
              ? 'number-pad'
              : 'numbers-and-punctuation'
          }
          placeholder="Weight"
          value={formData.weight}
          onChangeText={(value) => handleInputChange('weight', value)}
        />
        {/* Gender Field */}
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text style={{ color: 'white', fontSize: 16, marginRight: 10 }}>
            Gender:
          </Text>
          <Picker
            selectedValue={formData.gender}
            style={{ height: 40, width: 150, color: 'white' }}
            onValueChange={(itemValue) =>
              handleInputChange('gender', itemValue)
            }>
            <Picker.Item label="Male" value="male" />
            <Picker.Item label="Female" value="female" />
            <Picker.Item label="Other" value="other" />
          </Picker>
        </View>

        {/* Address Field */}
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text style={{ color: 'white', fontSize: 16, marginRight: 10 }}>
            Address:
          </Text>

          <Field
            placeholder="Address"
            value={formData.address}
            onChangeText={(value) => handleInputChange('address', value)}
          />
        </View>
        <Plans onSelect={handlePlanSelect} />
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
