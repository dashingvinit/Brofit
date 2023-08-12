import React, { useState, useEffect } from 'react';
import * as SecureStore from 'expo-secure-store';
import axios, { setTokenHeader } from './constants/Axios';
import { View, Text, TouchableOpacity } from 'react-native';
import Background from './components/Background';
import Btn from './components/Btn';
import { bgColor, neon } from './constants/Constants';
import Field from './components/Field';
import jwtDecode from 'jwt-decode';

const ConfirmPassword = () => {
  const [formData, setFormData] = useState({ password: '', confirmPassword: '' });

  const handleInputChange = (field, value) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [field]: value,
    }));
  };

  return (
    <Background>
      <View style={{ alignItems: 'center', width: 400 }}>
        <Text
          style={{
            color: 'white',
            fontSize: 64,
            fontWeight: 'bold',
            marginVertical: 50,
            
          }}>
          Brofit
        </Text>
        <View
          style={{
            backgroundColor: '#1d2226',
            height: 700,
            width: 400,
            borderTopLeftRadius: 130,
            paddingTop: 100,
            alignItems: 'center',
          }}>
          <Text style={{ fontSize: 40, color: neon, fontWeight: 'bold' }}>
            Reset Password
          </Text>
          <Text
            style={{
              color: 'grey',
              fontSize: 19,
              fontWeight: 'bold',
              marginBottom: 20,
            }}>
            Enter New Password
          </Text>
            <Field
                placeholder="Password"
                secureTextEntry={true}
                value={formData.password}
                onChangeText={(value) => handleInputChange('password', value)}
            />
            <Field
                placeholder="Confirm Password"
                secureTextEntry={true}
                value={formData.confirmPassword}
                onChangeText={(value) =>
                handleInputChange('confirmPassword', value)
                }
            />
          <View
            style={{
              alignItems: 'flex-end',
              width: '78%',
              paddingRight: 16,
              marginBottom: 200,
            }}>
          </View>
          <Btn
            textColor={bgColor}
            bgColor={neon}
            btnLabel="Reset"
            // Press={handleLogin}
          />
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
            }}>
          </View>
        </View>
      </View>
    </Background>
  );
};

export default ConfirmPassword
