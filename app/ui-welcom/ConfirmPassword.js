import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
  StyleSheet,
} from 'react-native';
import axios from '../constants/Axios';
import { Background, Btn } from '../components';
import { bgColor, neon, bgGlass } from '../constants/Constants';
import Ionicons from 'react-native-vector-icons/Ionicons';
import LottieView from 'lottie-react-native';

const ConfirmPassword = (props) => {
  const _id = props.route.params._id;
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(true);
  const [formData, setFormData] = useState({
    password: '',
    confirmPassword: '',
  });

  const handleInputChange = (field, value) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [field]: value,
    }));
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const handlePasswordReset = async () => {
    setLoading(true);
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    try {
      console.log(_id);
      const response = await axios.post(`/forgotPass/reset/${_id}`, {
        password: formData.password,
      });
      console.log(response.data);
      setLoading(false);
      props.navigation.navigate('Login');
    } catch (error) {
      console.log(error);
      alert('Password reset failed');
    }
  };

  return (
    <Background>
      <View style={{ flex: 1, justifyContent: 'space-between' }}>
        <Text
          style={{
            color: neon,
            fontSize: 40,
            fontWeight: 'bold',
            marginVertical: 50,
            textAlign: 'center',
          }}>
          Brofit
        </Text>
        <ScrollView>
          <View
            style={[
              styles.container4,
              Platform.OS === 'ios'
                ? styles.iosContainer
                : styles.androidContainer,
            ]}>
            <Text style={{ fontSize: 40, color: neon, fontWeight: 'bold' }}>
              Reset Password
            </Text>
            <Text
              style={{
                color: 'white',
                fontSize: 19,
                fontWeight: 'bold',
                marginBottom: 20,
              }}>
              Enter New Password
            </Text>
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
                  top: 22,
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
            <Btn
              textColor={bgColor}
              bgColor={neon}
              btnLabel="Reset"
              Press={handlePasswordReset}
            />
          </View>
        </ScrollView>
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
    </Background>
  );
};
const styles = StyleSheet.create({
  container4: {
    marginHorizontal: 20,
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

export default ConfirmPassword;
