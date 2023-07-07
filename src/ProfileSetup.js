import { View, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState, useEffect } from 'react';
import Background from './components/Background';
import { bgColor } from './constants/Constants';
import Field from './components/Field';

const ProfileSetup = () => {
  const _retriveData = async () => {
    try {
      const value = await AsyncStorage.getItem('UserObject');
      if (value !== null) {
        console.log(value);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const [formData, setFormData] = useState({
    userdId: '',
    weight: '',
    height: '',
    age: '',
    plan: '',
    goal: '',
  });

  setFormData({ ...formData, userId: user.userId });

  const handleProfileSetup = async () => {
    const { userId, weight, age, height, plan, goal } = formData;

    axios
      .post('/userProfile', {
        userId,
        age,
        weight,
        height,
        plan,
        goal,
      })
      .then((response) => {
        alert('SignUp successful');
        const user = response.data.data;
        props.navigation.navigate('ProfileSetup', { userObject: user });
        console.log('Response:', user);
      })
      .catch((error) => {
        alert('SignUp failed');
        console.error('Error:', error);
      });
  };

  const handleInputChange = (field, value) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [field]: value,
    }));
  };

  useEffect(() => {
    _retriveData();
  }, []);

  return (
    <Background>
      <Text>{user.email}</Text>
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
          //   value={formData.height}
          //   onChangeText={(value) => handleInputChange('height', value)}
        />
        <Field
          placeholder="Weight"
          //   value={formData.weight}
          //   onChangeText={(value) => handleInputChange('weight', value)}
        />
        <Field
          placeholder="Age"
          //   value={formData.age}
          //   onChangeText={(value) => handleInputChange('age', value)}
        />
        <Field
          placeholder="userId"
          value={user.age}
          //   onChangeText={(value) => handleInputChange('age', value)}
        />
      </View>
    </Background>
  );
};

export default ProfileSetup;
