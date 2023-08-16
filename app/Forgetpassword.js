import React, { useState, useEffect } from 'react';
import * as SecureStore from 'expo-secure-store';
import axios from './constants/Axios';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Background2 } from './components';
import Btn from './components/Btn';
import { bgColor, neon } from './constants/Constants';
import Field from './components/Field';
import jwtDecode from 'jwt-decode';

const Forgetpassword = () => {
  const [formData, setFormData] = useState({ email: '' });

  const handleInputChange = (field, value) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [field]: value,
    }));
  };

  const handleReset = async () => {
    try {
      console.log(formData);
      const response = await axios.post('/forgotPass', {
        email: formData.email,
      });
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Background2>
      <View
        style={{
          flex: 1,
          paddingHorizontal: 20,
          paddingVertical: 30,
          justifyContent: 'space-between',
        }}>
        <Text
          style={{
            color: 'white',
            fontSize: 32,
            fontWeight: 'bold',
            textAlign: 'center',
            marginTop: 20,
          }}>
          Brofit
        </Text>
        <View style={{}}>
          <Text style={{ fontSize: 32, color: neon, fontWeight: 'bold' }}>
            Reset Password
          </Text>
          <Text
            style={{
              color: 'grey',
              fontSize: 16,
              fontWeight: 'bold',
            }}>
            Enter your email to reset password
          </Text>
          <Field
            placeholder="Email"
            keyboardType="email-address"
            value={formData.email}
            onChangeText={(value) => handleInputChange('email', value)}
          />
          <View
            style={{
              alignItems: 'flex-end',
            }}></View>
          <Btn
            textColor={bgColor}
            bgColor={neon}
            btnLabel="Reset"
            Press={handleReset}
          />
        </View>
      </View>
    </Background2>
  );
};

const styles = StyleSheet.create({});

export default Forgetpassword;
