import React, { useState, useEffect } from 'react';
import * as SecureStore from 'expo-secure-store';
import axios, { setTokenHeader } from './constants/Axios';
import { View, Text, TouchableOpacity } from 'react-native';
import Background from './components/Background';
import Btn from './components/Btn';
import { bgColor, neon } from './constants/Constants';
import Field from './components/Field';

async function save(key, value) {
  await SecureStore.setItemAsync(key, value);
}

const Login = (props) => {
  const [formData, setFormData] = useState({ email: '', password: '' });

  const handleLogin = async () => {
    const { email, password } = formData;

    try {
      const response = await axios.post('/user/signin', { email, password });
      const token = response.data.data;
      await save('token', token); // Wait for the token to be saved
      setTokenHeader();
      alert('Login successful');
      // console.log('Response:', token);
      props.navigation.navigate('Home1');
    } catch (error) {
      alert('Login failed');
      console.error('Login failed');
      console.error('Error:', error);
    }
  };

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
          Login
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
            <Text style={{ color: neon, fontWeight: 'bold', fontSize: 16 }}>
              Forgot Password ?
            </Text>
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
