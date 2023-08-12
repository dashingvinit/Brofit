import { View, Text, ScrollView } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import axios, { setTokenHeader } from './constants/Axios';
import React, { useEffect, useState } from 'react';
import { Background, Gender, Plans, Btn, Field, Hr } from './components';
import { neon, bgColor } from './constants/Constants';
import LottieView from 'lottie-react-native';

const ProfileSetup = (props) => {
  // const setTokenHeader = async () => {
  //   const token = await SecureStore.getItemAsync('token');
  //   axios.interceptors.request.use((config) => {
  //     config.headers['x-access-token'] = token;
  //     return config;
  //   });
  //   console.log('Token set:', token);
  // };

  setTokenHeader();

  const [newloading, setnewLoading] = useState(false);

  const [formData, setFormData] = useState({
    weight: '',
    height: '',
    plan: 'no plan',
    age: 21,
    phoneNumber: '1234567890',
    gender: 'other',
    address: 'Kathmandu',
  });

  const handleProfileSetup = async () => {
    try {
      setnewLoading(true);
      const response = await axios.post('/userProfile', formData);
      alert('Setup successful');

      setnewLoading(false);
      props.sethandleLogin();
      props.navigation.navigate('Home1');
      // console.log('Response:', user);
    } catch (error) {
      alert('Setup failed');
      console.error('Error:', 'profilesetup', error);
    }
  };

  const handlePlanSelect = (plan) => {
    const selectedPlanName = plan._id;
    // console.log(selectedPlanName);
    setFormData((prevFormData) => ({
      ...prevFormData,
      plan: selectedPlanName,
    }));
  };

  const handleGenderSelect = (gender) => {
    const selectedGender = gender;
    // console.log(selectedGender);
    setFormData((prevFormData) => ({
      ...prevFormData,
      gender: selectedGender,
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
      <ScrollView
        style={{
          flex: 1,
          paddingHorizontal: 20,
        }}>
        <View
          style={{
            flex: 1,
            justifyContent: 'space-around',
          }}>
          <View style={{ flex: 1, marginHorizontal: 20 }}>
            <Text
              style={{
                color: neon,
                fontSize: 40,
                fontWeight: 'bold',
                marginTop: 50,
                textAlign: 'center',
              }}>
              Welcome
            </Text>
            <Text
              style={{
                color: 'white',
                fontSize: 20,
                fontWeight: 'bold',
                marginBottom: 20,
                textAlign: 'center',
              }}>
              Setup your profile😉
            </Text>
          </View>
          <View
            style={{
              flex: 1,
              flexDirection: 'column',
            }}>
            <Field
              keyboardType={
                Platform.OS === 'android'
                  ? 'phone-pad'
                  : Platform.OS === 'ios'
                  ? 'number-pad'
                  : 'numbers-and-punctuation'
              }
              placeholder="Weight"
              icon="anchor"
              value={formData.weight}
              onChangeText={(value) => handleInputChange('weight', value)}
            />
            <Field
              keyboardType={
                Platform.OS === 'android'
                  ? 'phone-pad'
                  : Platform.OS === 'ios'
                  ? 'number-pad'
                  : 'numbers-and-punctuation'
              }
              placeholder="Height"
              icon="edit-3"
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
              icon="chevrons-up"
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
              placeholder="Number"
              icon="chevrons-up"
              value={formData.phoneNumber.toString()}
              onChangeText={(value) => handleInputChange('phoneNumber', value)}
            />
            <Gender onSelect={handleGenderSelect} />
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',

                width: '100%',
              }}>
              <Text style={{ color: 'white', fontSize: 16, marginRight: 10 }}>
                Address:
              </Text>
              <View style={{ width: '100%', flex: 1 }}>
                <Field
                  placeholder="Address"
                  value={formData.address}
                  onChangeText={(value) => handleInputChange('address', value)}
                />
              </View>
            </View>
            <Plans onSelect={handlePlanSelect} />
            <Btn
              textColor={bgColor}
              bgColor={neon}
              btnLabel="Update"
              Press={handleProfileSetup}
            />
          </View>
        </View>
        {newloading && (
          <View
            style={{
              position: 'absolute',
              top: 0,
              bottom: 0,
              left: 0,
              right: 0,
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <LottieView
              source={require('./assets/lottieFiles/loading1.json')}
              autoPlay
              loop
            />
          </View>
        )}
      </ScrollView>
    </Background>
  );
};

export default ProfileSetup;
