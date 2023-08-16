import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput } from 'react-native';
import axios from './constants/Axios';
import Background from './components/Background';
import Btn from './components/Btn';
import { bgColor, neon, bgGlass } from './constants/Constants';
import Ionicons from 'react-native-vector-icons/Ionicons';

const ConfirmPassword = (props) => {
  const _id = props.route.params._id;
  const [showPassword, setShowPassword] = useState(false);
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
      alert('Password reset successful');
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
        <View style={{ marginHorizontal: 20 }}>
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
      </View>
    </Background>
  );
};

export default ConfirmPassword;
