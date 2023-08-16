import React, { useState } from 'react';
import * as SecureStore from 'expo-secure-store';
import axios, { setTokenHeader } from './constants/Axios';
import { View, Text, TouchableOpacity, Keyboard } from 'react-native';
import Background from './components/Background';
import Btn from './components/Btn';
import { bgColor, neon } from './constants/Constants';
import Field from './components/Field';
import jwtDecode from 'jwt-decode';
import LottieView from 'lottie-react-native';

async function save(key, value) {
  await SecureStore.setItemAsync(key, value);
}

const Login = (props) => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    const { email, password } = formData;

    try {
      setLoading(true);
      Keyboard.dismiss();

      const response = await axios.post('/user/signin', {
        email,
        password,
      });
      const token = response.data.data;
      const decodedPayload = jwtDecode(token);
      const user = JSON.stringify(decodedPayload);
      await save('user', user);

      const expires = Date.now() + 1000 * 60 * 60 * 24 * 365; // 1 year
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
      if ((error.response && error.response.status === 400) || 404) {
        setError('Invalid email or password');
      } else {
        console.error('Error logging in:');
      }
    }
  };

  const handleInputChange = (field, value) => {
    setError('');
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
          {error !== '' && (
            <Text
              style={{
                color: 'red',
                fontSize: 14,
                fontWeight: 'bold',
                textAlign: 'center',
              }}>
              {error}
            </Text>
          )}
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
            source={require('./assets/lottieFiles/loadingSkeliton.json')}
            autoPlay
            loop
          />
        </View>
      )}
    </Background>
  );
};

export default Login;
