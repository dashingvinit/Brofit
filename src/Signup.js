import React, { useEffect, useState } from 'react';
import * as SecureStore from 'expo-secure-store';
import axios, { setTokenHeader } from './constants/Axios';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Background from './components/Background2';
import Btn from './components/Btn';
import { bgColor, neon } from './constants/Constants';
import Field from './components/Field';

async function save(key, value) {
  await SecureStore.setItemAsync(key, value);
}

const Signup = (props) => {
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    gymId: '',
    password: '',
    confirmPassword: '',
  });

  const handleInputChange = (field, value) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [field]: value,
    }));
  };

  const handleSignup = async () => {
    const { name, email, gymId, password, confirmPassword } = formData;

    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    try {
      const response = await axios.post('user/signup', {
        name,
        email,
        gymId,
        password,
      });

      const userJSON = response.data.data.user;
      const user = JSON.stringify(userJSON);
      // console.log('user', user);
      await save('user', user);

      if (response.data.data.jwt) {
        const token = response.data.data.jwt;
        const expires = Date.now() + 1000 * 60 * 60; // 1hr
        const expireString = JSON.stringify(expires);

        await save('expire', expireString);
        await save('token', token);
        await save('user', user);
        console.log('user', user);
        // Inside handleLogin function
        await setTokenHeader().then(() => {
          console.log('Token Set');
          setLoading(false);
        });
      }

      console.log('Token Set');
      setLoading(false);
      alert('SignUp successful');
    } catch (error) {
      alert('SignUp failed');
      console.error('Error:', error);
    }
  };

  const nextPage = () => {
    props.navigation.navigate('ProfileSetup');
  };

  return (
    <Background>
      <View style={styles.container}>
        <View style={{ alignItems: 'center' }}>
          <Text style={styles.header}>hi,again</Text>
          <Text style={styles.headerText}>Create a new account</Text>
        </View>
        <View style={{}}>
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
            placeholder="Gym_Id"
            value={formData.gymId}
            icon="key"
            onChangeText={(value) => handleInputChange('gymId', value)}
          />
          <Field
            placeholder="Password"
            secureTextEntry={true}
            value={formData.password}
            icon="lock"
            onChangeText={(value) => handleInputChange('password', value)}
          />
          <Field
            placeholder="Confirm Password"
            // secureTextEntry={true}
            value={formData.confirmPassword}
            icon="eye-off"
            onChangeText={(value) =>
              handleInputChange('confirmPassword', value)
            }
          />
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
          {loading ? null : (
            <Btn
              textColor={bgColor}
              bgColor={neon}
              btnLabel="Next"
              loading={loading}
              disable={loading}
              Press={nextPage}
            />
          )}
          <View style={styles.redirectContainer}>
            <Text style={{ fontSize: 16, fontWeight: 'bold', color: 'white' }}>
              Already have an account ?{' '}
            </Text>
            <TouchableOpacity
              onPress={() => props.navigation.navigate('Login')}>
              <Text style={styles.redirectBtn}>Login</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
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
  },
  redirectMsg: {
    color: '#EEEEEE',
    fontSize: 16,
    flexWrap: 'wrap',
    textAlign: 'center',
  },
  redirectBtn: {
    color: neon,
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default Signup;
