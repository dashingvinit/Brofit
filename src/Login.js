import React, { useState, useEffect } from 'react';
import * as SecureStore from 'expo-secure-store';
import axios, { setTokenHeader } from './constants/Axios';
import { View, Text, TouchableOpacity } from 'react-native';
import Background from './components/Background';
import Btn from './components/Btn';
import { bgColor, bgGlass, neon } from './constants/Constants';
import Field from './components/Field';
import jwtDecode from 'jwt-decode';
import LottieView from 'lottie-react-native';

async function save(key, value) {
  await SecureStore.setItemAsync(key, value);
}

const Login = (props) => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    const { email, password } = formData;

    try {
      setLoading(true);

      const response = await axios.post('/user/signin', {
        email,
        password,
      });
      const token = response.data.data;
      const decodedPayload = jwtDecode(token);
      const user = JSON.stringify(decodedPayload);
      // console.log('OwnerLoggedIn', decodedPayload);
      // console.log('user', user);
      // console.log('User Saved', response);
      await save('user', user);

      const expires = Date.now() + 1000 * 60 * 60; // 1 hour
      const stringExpires = JSON.stringify(expires);

      await save('token', token);
      await save('expire', stringExpires); // Wait for the token to be saved

      await setTokenHeader().then(() => {
        console.log('Token Set');
      });

      setLoading(false);

      props.sethandleLogin();
      {
        user.role === 'owner'
          ? props.navigation.navigate('Home2')
          : user.role === 'admin'
          ? props.navigation.navigate('Home3')
          : props.navigation.navigate('Home1');
      }
    } catch (error) {
      setLoading(false);
      alert('Login failed');
      console.error('Login Error:', error);
    }
  };

  const handleInputChange = (field, value) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [field]: value,
    }));
  };

  setTokenHeader();

  return (
    <Background>
      <View
        style={{
          flex: 1,
          justifyContent: 'space-between',
          marginVertical: 20,
        }}>
        <View>
          <Text
            style={{
              color: 'white',
              fontSize: 64,
              fontWeight: 'bold',
              textAlign: 'center',
              marginVertical: 50,
            }}>
            Login
          </Text>
        </View>

        <View
          style={{
            justifyContent: 'center',
            marginHorizontal: 20,
          }}>
          <Text
            style={{
              color: neon,
              fontSize: 24,
              fontWeight: 'bold',
            }}>
            Login to your account
          </Text>
          <LottieView
            source={require('./assets/lottieFiles/darkDumbellWithHands.json')}
            autoPlay
            loop
          />
          <Field
            placeholder="Email"
            keyboardType="email-address"
            icon="mail"
            value={formData.email}
            onChangeText={(value) => handleInputChange('email', value)}
          />
          <Field
            placeholder="Password"
            secureTextEntry={true}
            icon="lock"
            value={formData.password}
            onChangeText={(value) => handleInputChange('password', value)}
          />
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'flex-end',
              paddingRight: 12,
            }}>
            <TouchableOpacity
              onPress={() => props.navigation.navigate('Forgetpassword')}>
              <Text
                style={{
                  color: neon,
                  fontWeight: 'bold',
                  fontSize: 16,
                }}>
                Forgot Password ?
              </Text>
            </TouchableOpacity>
          </View>

          <Btn
            textColor={bgColor}
            bgColor={neon}
            btnLabel="Login"
            Press={handleLogin}
            disabled={loading}
          />
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
            }}>
            <Text style={{ fontSize: 12, fontWeight: 'bold', color: 'white' }}>
              Don't have an account ?{' '}
            </Text>
            <TouchableOpacity
              onPress={() => props.navigation.navigate('Signup')}>
              <Text style={{ color: neon, fontWeight: 'bold', fontSize: 14 }}>
                Signup
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      {loading && (
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
            source={require('../src/assets/lottieFiles/loadingSkeliton.json')}
            autoPlay
            loop
          />
        </View>
      )}
    </Background>
  );
};

export default Login;
