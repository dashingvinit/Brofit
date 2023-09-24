import React, { useState } from 'react';
import * as SecureStore from 'expo-secure-store';
import axios, { setTokenHeader } from '../constants/Axios';
import {
  View,
  Text,
  TouchableOpacity,
  Keyboard,
  TextInput,
  ScrollView,
  Platform,
  StyleSheet,
} from 'react-native';
import { Background, Field, Btn } from '../components';
import { bgColor, neon, bgGlass } from '../constants/Constants';
import jwtDecode from 'jwt-decode';
import LottieView from 'lottie-react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

async function save(key, value) {
  await SecureStore.setItemAsync(key, value);
}

const Login = (props) => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const togglePasswordVisibility = () => {
    Keyboard.dismiss();
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

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
        //console.log('Token Set');
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
      <ScrollView>
        <View
          style={[
            styles.container,
            Platform.OS === 'ios'
              ? styles.iosContainer
              : styles.androidContainer,
          ]}>
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
            <View style={{ position: 'relative' }}>
              <TextInput
                style={{
                  borderWidth: 1,
                  borderColor: neon,
                  borderRadius: 15,
                  color: 'white',
                  width: '100%',
                  padding: 10,
                  fontSize: 14,
                  backgroundColor: bgGlass,
                  marginVertical: 10,
                }}
                placeholderTextColor={'#EEEEEE'}
                placeholder="Password"
                secureTextEntry={!showPassword}
                value={formData.password}
                onChangeText={(value) => handleInputChange('password', value)}
              />
              <TouchableOpacity
                onPress={togglePasswordVisibility}
                style={{
                  position: 'absolute',
                  top: 22,
                  right: 10,
                  zIndex: 2,
                  opacity: 0.5,
                }}>
                <Ionicons
                  name={showPassword ? 'eye-outline' : 'eye-off-outline'}
                  size={24}
                  color={neon}
                />
              </TouchableOpacity>
            </View>
            {/* <Field
            placeholder="Password"
            secureTextEntry={true}
            icon="lock"
            value={formData.password}
            onChangeText={(value) => handleInputChange('password', value)}
          /> */}
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
              <Text
                style={{ fontSize: 12, fontWeight: 'bold', color: 'white' }}>
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
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    marginVertical: 20,
  },
  iosContainer: {
    marginTop: '80%',
    marginBottom: '90%',
  },
  androidContainer: {
    marginTop: '80%',
    marginBottom: '10%',
  },
});

export default Login;
