import { View, Text } from 'react-native';
import axios from './constants/Axios';
import React, { useState } from 'react';
import Background from './components/Background';
import { neon, bgColor } from './constants/Constants';
import Field from './components/Field';
import Btn from './components/Btn';
import Plans from './components/Plans';

const ProfileSetup = (props) => {
  const [formData, setFormData] = useState({
    weight: '70',
    height: '10',
    plan: '',
  });

  const handlePlanSelect = (plan) => {
    const selectedPlanName = plan._id;
    console.log(selectedPlanName);
    setFormData((prevFormData) => ({
      ...prevFormData,
      plan: selectedPlanName,
    }));
  };

  const handleProfileSetup = async () => {
    const { weight, height, plan } = formData;

    axios
      .post('/userProfile', {
        weight,
        height,
        plan,
      })
      .then((response) => {
        alert('Setup successful');
        const user = response.data.data;
        props.navigation.navigate('Home');
        console.log('Response:', user);
      })

      .catch((error) => {
        alert('Setup failed');
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
          placeholder="Weight"
          value={formData.weight}
          onChangeText={(value) => handleInputChange('weight', value)}
        />
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
