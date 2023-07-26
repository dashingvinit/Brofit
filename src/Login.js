import React, { useState, useEffect } from 'react';
import * as SecureStore from 'expo-secure-store';
import axios, { setTokenHeader } from './constants/Axios';
import { View, Text, TouchableOpacity } from 'react-native';
import Background from './components/Background';
import Btn from './components/Btn';
import { bgColor, neon } from './constants/Constants';
import Field from './components/Field';
import jwtDecode from 'jwt-decode';

async function save(key, value) {
  await SecureStore.setItemAsync(key, value);
}

const Login = (props) => {
  const [formData, setFormData] = useState({ email: '', password: '' });

  const handleLogin = async () => {
    const { email, password } = formData;

    try {
      const response = await axios.post('/user/signin', {
        email,
        password,
      });
      const token = response.data.data;
      const decodedPayload = jwtDecode(token);
      const user = JSON.stringify(decodedPayload);
      // console.log('OwnerLoggedIn', decodedPayload);
      // console.log('user', user);
      await save('user', user);
      console.log('User Saved', user);

      const expires = Date.now() + 1000 * 60 * 60; // 1 hour
      const stringExpires = JSON.stringify(expires);

      await save('token', token);
      await save('expire', stringExpires); // Wait for the token to be saved

      // Inside handleLogin function
      await setTokenHeader().then(() => {
        console.log('Token Set');
      });
      // console.log('Response:', token);
      props.sethandleLogin();
      {
        user.role === 'owner'
          ? props.navigation.navigate('Home2')
          : user.role === 'admin'
          ? props.navigation.navigate('Home3')
          : props.navigation.navigate('Home1');
      }
    } catch (error) {
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
      <View style={{ alignItems: 'center', width: 400 }}>
        <Text
          style={{
            color: 'white',
            fontSize: 64,
            fontWeight: 'bold',
            marginVertical: 50,
          }}>
          Login
        </Text>
        <View
          style={{
            backgroundColor: bgColor,
            height: 700,
            width: '100%',
            borderTopLeftRadius: 130,
            paddingTop: 100,
            alignItems: 'center',
          }}>
          <Text style={{ fontSize: 40, color: neon, fontWeight: 'bold' }}>
            Welcome Back
          </Text>
          <Text
            style={{
              color: 'grey',
              fontSize: 19,
              fontWeight: 'bold',
              marginBottom: 20,
            }}>
            Login to your account
          </Text>
          <Field
            placeholder="Email / Username"
            keyboardType="email-address"
            value={formData.email}
            onChangeText={(value) => handleInputChange('email', value)}
          />
          <Field
            placeholder="Password"
            secureTextEntry={true}
            value={formData.password}
            onChangeText={(value) => handleInputChange('password', value)}
          />
          <View
            style={{
              alignItems: 'flex-end',
              width: '78%',
              paddingRight: 16,
              marginBottom: 200,
            }}>
            <TouchableOpacity
              onPress={() => props.navigation.navigate('Forgetpassword')}>
              <Text style={{ color: neon, fontWeight: 'bold', fontSize: 16 }}>
                Forgot Password ?
              </Text>
            </TouchableOpacity>
          </View>
          <Btn
            textColor={bgColor}
            bgColor={neon}
            btnLabel="Login"
            Press={handleLogin}
          />
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
            }}>
            <Text style={{ fontSize: 16, fontWeight: 'bold', color: 'white' }}>
              Don't have an account ?{' '}
            </Text>
            <TouchableOpacity
              onPress={() => props.navigation.navigate('Signup')}>
              <Text style={{ color: neon, fontWeight: 'bold', fontSize: 16 }}>
                Signup
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Background>
  );
};

export default Login;
