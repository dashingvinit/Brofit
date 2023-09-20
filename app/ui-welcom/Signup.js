import React, { useEffect, useState } from 'react';
import * as SecureStore from 'expo-secure-store';
import axios, { setTokenHeader } from '../constants/Axios';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Platform,
} from 'react-native';
import { Background, Btn, Field } from '../components';
import { bgColor, bgGlass, neon } from '../constants/Constants';
import LottieView from 'lottie-react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

async function save(key, value) {
  await SecureStore.setItemAsync(key, value);
}

const Signup = (props) => {
  const [loading, setLoading] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [errMsg, setErrMsg] = useState('');
  const [newloading, setnewLoading] = useState(false);
  // const [check, setcheck] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    gymId: '',
    password: '',
    confirmPassword: '',
    registerationNumber: '',
  });
  // const [showRegistrationIdField, setShowRegistrationIdField] = useState(false);

  // const toggleRegistrationIdField = () => {
  //   setShowRegistrationIdField(!showRegistrationIdField);
  //   if (check) {
  //     setcheck(false);
  //   } else {
  //     setcheck(true);
  //   }
  // };

  const handleInputChange = (field, value) => {
    setErrMsg('');
    setFormData((prevFormData) => ({
      ...prevFormData,
      [field]: value,
    }));
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const handleSignup = async () => {
    setnewLoading(true);
    const {
      name,
      email,
      gymId,
      password,
      confirmPassword,
      registerationNumber,
    } = formData;

    if (password !== confirmPassword) {
      setErrMsg('Password do not match');
      setnewLoading(false);
      return;
    }
    try {
      const response = await axios.post('user/signup', {
        name,
        email,
        gymId,
        password,
        registerationNumber,
      });
      const userJSON = response.data.data.user;
      const user = JSON.stringify(userJSON);
      // console.log('user', user);
      SecureStore.setItemAsync('profileSet', 'false');
      SecureStore.setItemAsync('a', 'false');
      await save('user', user);
      if (response.data.data.jwt) {
        const token = response.data.data.jwt;
        const expires = Date.now() + 1000 * 60 * 60 * 24 * 365; // 1yr
        const expireString = JSON.stringify(expires);
        await save('expire', expireString);
        await save('token', token);
        await save('user', user);
        // Inside handleLogin function
        await setTokenHeader().then(() => {
          console.log('Token Set');
          setLoading(false);
          const parsedUser = JSON.parse(user);
          console.log(parsedUser.role);

          if (parsedUser.role == 'owner') {
            props.navigation.navigate('Login');
          } else {
            nextPage();
          }
        });
      }
      setLoading(false);
      setnewLoading(false);
    } catch (error) {
      console.log(error.response);
      if ((error.response && error.response.status === 400) || 404) {
        setError('Cannot create user with this registration number');
      } else {
        console.error('Error logging in:');
      }
      setnewLoading(false);
    }
  };

  const nextPage = () => {
    setnewLoading(true);
    props.navigation.navigate('ProfileSetup');
    setnewLoading(false);
  };

  return (
    <Background>
      <View style={styles.container}>
        <View style={{ alignItems: 'center' }}>
          <Text style={styles.header}>hi,again</Text>
          <Text style={styles.headerText}>Create a new account</Text>
        </View>
        <ScrollView>
          <View
            style={[
              Platform.OS === 'ios'
                ? styles.iosContainer
                : styles.androidContainer,
            ]}>
            <Field
              placeholder="Name"
              value={formData.name}
              icon="user"
              onChangeText={(value) => handleInputChange('name', value)}
            />
            <Field
              placeholder="Email"
              keyboardType={'email-address'}
              value={formData.email}
              icon="mail"
              onChangeText={(value) => handleInputChange('email', value)}
            />
            <Field
              placeholder="Gym_Id (Ask your Gym Owner)"
              value={formData.gymId}
              icon="key"
              onChangeText={(value) => handleInputChange('gymId', value)}
            />
            <Field
              placeholder="Reg  No."
              value={formData.registerationNumber}
              icon="user"
              onChangeText={(value) =>
                handleInputChange('registerationNumber', value)
              }
            />
            {errMsg !== '' && (
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  paddingHorizontal: 10,
                }}>
                <Text style={{ color: 'red' }}>{errMsg}</Text>
              </View>
            )}

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
                  top: 23,
                  right: 10,
                  zIndex: 2,
                  opacity: 0.5,
                }}>
                <Ionicons
                  name={showPassword ? 'eye-off-outline' : 'eye-outline'}
                  size={24}
                  color={neon}
                />
              </TouchableOpacity>
            </View>
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
                placeholder="Confirm Password"
                secureTextEntry={!showPassword}
                value={formData.confirmPassword}
                onChangeText={(value) =>
                  handleInputChange('confirmPassword', value)
                }
              />
              <TouchableOpacity
                onPress={togglePasswordVisibility}
                style={{
                  position: 'absolute',
                  top: 23,
                  right: 10,
                  zIndex: 2,
                  opacity: 0.5,
                }}>
                <Ionicons
                  name={showPassword ? 'eye-off-outline' : 'eye-outline'}
                  size={24}
                  color={neon}
                />
              </TouchableOpacity>
            </View>

            {/* <TouchableOpacity
              onPress={toggleRegistrationIdField}
              style={styles.checkboxContainer}>
              <Ionicons
                name={check ? 'md-checkmark' : 'square-outline'}
                size={24}
                color={neon}
              /> */}
            {/* <View
                style={[
                  styles.checkbox,
                  showRegistrationIdField && styles.checkboxChecked,
                ]}
              />
              <Text style={styles.checkboxLabel}>Already member</Text>
            </TouchableOpacity>

            {showRegistrationIdField && (
              <Field
                placeholder="Reg  No."
                value={formData.registerationNumber}
                icon="user"
                onChangeText={(value) => handleInputChange('registerationNumber', value)}
              />
            )} */}

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

            <View style={styles.redirectContainer}>
              <Text style={styles.redirectMsg}>
                By signing in, you agree to our{' '}
              </Text>
              <Text style={styles.redirectBtn}>Terms & Conditions</Text>
              <Text style={styles.redirectMsg}> and </Text>
              <Text style={styles.redirectBtn}>Privacy Policy</Text>
            </View>

            <Btn
              textColor={bgColor}
              bgColor={neon}
              btnLabel="Signup"
              Press={handleSignup}
            />
            {/* {loading ? null : (
              <Btn
                textColor={bgColor}
                bgColor={neon}
                btnLabel="Next"
                loading={true}
                disable={false}
                Press={nextPage}
              />
            )} */}
            <View style={styles.redirectContainer1}>
              <Text
                style={{ fontSize: 16, fontWeight: 'bold', color: 'white' }}>
                Already have an account ?{' '}
              </Text>
              <TouchableOpacity
                onPress={() => props.navigation.navigate('Login')}>
                <Text style={styles.redirectBtn}>Login</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </View>
      {newloading && (
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
    </Background>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    marginBottom: 20,
    marginHorizontal: 20,
  },
  iosContainer: {
    marginTop: '70%',
    marginBottom: '90%',
  },
  androidContainer: {
    marginTop: '30%',
    marginBottom: '10%',
  },
  header: {
    color: 'white',
    fontSize: 64,
    fontWeight: 'bold',
    marginTop: 50,
  },
  headerText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  redirectContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
    textAlign: 'center',
    marginTop: 30,
  },
  redirectContainer1: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
    textAlign: 'center',
  },
  redirectMsg: {
    color: '#EEEEEE',
    fontSize: 16,
    flexWrap: 'wrap',
    textAlign: 'center',
  },
  checkboxLabel: {
    color: 'white',
    fontSize: 16,
  },
  checkboxContainer: {
    margin: 10,
    flexDirection: 'row',
    gap: 5,
  },
  redirectBtn: {
    color: neon,
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default Signup;
