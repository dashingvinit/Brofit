import { View, Text, ScrollView } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import axios, { setTokenHeader } from '../constants/Axios';
import React, { useEffect, useState, useRef } from 'react';
import { Background, Gender, Plans, Btn, Field, Hr } from '../components';
import { neon, bgColor } from '../constants/Constants';
import LottieView from 'lottie-react-native';

const ProfileSetup = (props) => {
  setTokenHeader();

  const [newloading, setnewLoading] = useState(false);
  const [isPlanSelected, setIsPlanSelected] = useState(false);
  const scrollRef = useRef(null);

  const [formData, setFormData] = useState({
    weight: '',
    height: '',
    plan: 'no plan',
    age: undefined,
    phoneNumber: '',
    gender: 'other',
    address: '',
  });

  const handleProfileSetup = async () => {
    setnewLoading(true);
    const profile = await SecureStore.getItemAsync('profileSet');
    const a = await SecureStore.getItemAsync('a');
    try {
      const response = await axios.post('/userProfile', formData);
      // alert('Setup successful');
      console.log('profile', profile);
      console.log('profile a', a);
      if (profile === 'false' && a === 'false') {
        props.sethandleLogin();
        SecureStore.setItemAsync('profileSet', 'true');
      }
      if (profile === 'false' && a === 'true') {
        console.log('helo');
        SecureStore.setItemAsync('profileSet', 'true');
        props.navigation.navigate('HomeScreen');
      }
    } catch (error) {
      alert('Setup failed');
      console.error('Error:', 'profilesetup', error);
    }
    setnewLoading(false);
  };

  const handlePlanSelect = (plan) => {
    const selectedPlanName = plan._id;
    // console.log(selectedPlanName);
    setFormData((prevFormData) => ({
      ...prevFormData,
      plan: selectedPlanName,
    }));
    setIsPlanSelected(true);
    scrollRef.current.scrollTo({ x: 0, y: 50000, animated: true });
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
        }}
        ref={scrollRef}>
        <View
          style={{
            flex: 1,
            justifyContent: 'space-around',
            marginBottom: '15%',
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
              placeholder="Weight (kg)"
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
              placeholder="Height (cm)"
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
              placeholder="Age (yrs)"
              icon="chevrons-up"
              value={formData.age}
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
              placeholder="Ph No."
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
                  placeholder="Line 1"
                  value={formData.address}
                  onChangeText={(value) => handleInputChange('address', value)}
                />
              </View>
            </View>
            <View style={{ marginBottom: 20 }}>
              <Plans onSelect={handlePlanSelect} />
              {isPlanSelected && (
                <Btn
                  textColor={bgColor}
                  bgColor={neon}
                  btnLabel="Update"
                  Press={handleProfileSetup}
                />
              )}
            </View>
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
              source={require('../assets/lottieFiles/loadingSkeliton.json')}
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
