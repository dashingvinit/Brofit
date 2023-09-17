import React, { useState } from 'react';
import axios from '../constants/Axios';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Background2, Field, Btn } from '../components';
import { bgColor, neon } from '../constants/Constants';
import LottieView from 'lottie-react-native';

const Forgetpassword = (props) => {
  const [formData, setFormData] = useState({ email: '', otp: '' });
  const [loading, setLoading] = useState(false);
  const [res, setRes] = useState(null);

  const handleInputChange = (field, value) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [field]: value,
    }));
  };

  const handleReset = async () => {
    setLoading(true);
    try {
      //console.log(formData);
      const response = await axios.post('/forgotPass', {
        email: formData.email,
      });
      const OTP = response.data.data;
      setRes(OTP);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleOTP = async () => {
    setLoading(true);
    const UserOtp = formData.otp;
    console.log(UserOtp);
    const ServerOtp = res.otp;
    console.log(ServerOtp);
    if (UserOtp == ServerOtp) {
      setLoading(false);
      props.navigation.navigate('ConfirmPass', { _id: res.userId });
    } else {
      setLoading(false);
      alert('Wrong OTP');
    }
  };

  return (
    <Background2>
      <View style={{ marginTop: 40 }}>
        <Text style={styles.brofit}>Brofit</Text>
      </View>
      <ScrollView>
        <View
          style={[
            styles.container,
            Platform.OS === 'ios'
              ? styles.iosContainer
              : styles.androidContainer,
          ]}>
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
          {loading && (
            <View
              style={{
                position: 'absolute',
                top: 0,
                bottom: 0,
                left: 0,
                right: 0,
                backgroundColor: 'rgba(0,0,0, 0.5)',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <LottieView
                source={require('../assets/lottieFiles/greenTik.json')}
                autoPlay
                loop
              />
            </View>
          )}
        </View>
      </ScrollView>
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
  iosContainer: {
    marginTop: '90%',
    marginBottom: '90%',
  },
  androidContainer: {
    marginTop: '80%',
    marginBottom: '10%',
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
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  otpContainer: {
    paddingHorizontal: 0,
  },
});

export default Forgetpassword;
