import React, { useState, useEffect } from 'react';
import * as SecureStore from 'expo-secure-store';
import axios from './constants/Axios';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Background2 } from './components';
import Btn from './components/Btn';
import { bgColor, neon } from './constants/Constants';
import Field from './components/Field';
import jwtDecode from 'jwt-decode';

const Forgetpassword = (props) => {
  const [formData, setFormData] = useState({ email: '', otp: '' });
  const [res, setRes] = useState(null);

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
      const OTP = response.data.data;
      setRes(OTP);
    } catch (error) {
      console.log(error);
    }
  };

  const handleOTP = async () => {
    const UserOtp = formData.otp;
    console.log(UserOtp);
    const ServerOtp = res.otp;
    console.log(ServerOtp);
    if (UserOtp == ServerOtp) {
      props.navigation.navigate('ConfirmPass', { _id: res.userId });
    } else {
      alert('Wrong OTP');
    }
  };

  return (
    <Background2>
      <View style={styles.container}>
        <Text style={styles.brofit}>Brofit</Text>
        <View>
          {res ? (
            <View style={styles.otpContainer}>
              <Field
                placeholder="4 digit OTP"
                keyboardType="numeric"
                value={formData.otp}
                onChangeText={(value) => handleInputChange('otp', value)}
              />
              <Btn
                textColor={bgColor}
                bgColor={neon}
                btnLabel="Confirm"
                Press={handleOTP}
              />
            </View>
          ) : (
            <View style={{}}>
              <Text style={styles.resetTxt}>Reset Password</Text>
              <Text style={styles.info}>
                Enter your email to reset password
              </Text>
              <Field
                placeholder="Email"
                keyboardType="email-address"
                value={formData.email}
                onChangeText={(value) => handleInputChange('email', value)}
              />
              <Btn
                textColor={bgColor}
                bgColor={neon}
                btnLabel="Get OTP"
                Press={handleReset}
              />
            </View>
          )}
        </View>
      </View>
    </Background2>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 30,
    justifyContent: 'space-around',
  },
  brofit: {
    color: 'white',
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 20,
  },
  resetTxt: {
    fontSize: 32,
    color: neon,
    fontWeight: 'bold',
  },
  info: {
    color: 'grey',
    fontSize: 16,
    fontWeight: 'bold',
  },
  otpContainer: {
    paddingHorizontal: 0,
  },
});

export default Forgetpassword;
