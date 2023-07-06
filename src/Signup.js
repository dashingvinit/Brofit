import React from 'react';
import { View, Text, Touchable, TouchableOpacity } from 'react-native';
import Background from './components/Background';
import Btn from './components/Btn';
import { bgColor, neon } from './constants/Constants';
import Field from './components/Field';

const Signup = (props) => {
  return (
    <Background>
      <View style={{ alignItems: 'center', width: 400 }}>
        <Text
          style={{
            color: 'white',
            fontSize: 64,
            fontWeight: 'bold',
            marginTop: 50,
          }}>
          Register
        </Text>
        <Text
          style={{
            color: 'white',
            fontSize: 19,
            fontWeight: 'bold',
            marginBottom: 20,
          }}>
          Create a new account
        </Text>
        <View
          style={{
            backgroundColor: '#1d2226',
            height: 700,
            width: 400,
            borderTopLeftRadius: 130,
            paddingTop: 50,
            alignItems: 'center',
          }}>
          <Field placeholder="First Name" />
          <Field placeholder="Last Name" />
          <Field placeholder="Email" keyboardType={'email-address'} />
          <Field placeholder="Gym_Id" keyboardType={'number'} />
          <Field placeholder="Password" secureTextEntry={true} />
          <Field placeholder="Confirm Password" secureTextEntry={true} />
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              width: '78%',
              paddingRight: 16,
            }}>
            <Text style={{ color: 'grey', fontSize: 16 }}>
              By signing in, you agree to our{' '}
            </Text>
            <Text style={{ color: neon, fontWeight: 'bold', fontSize: 16 }}>
              Terms & Conditions
            </Text>
          </View>

          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
              width: '78%',
              paddingRight: 16,
              marginBottom: 10,
            }}>
            <Text style={{ color: 'grey', fontSize: 16 }}>and </Text>
            <Text style={{ color: neon, fontWeight: 'bold', fontSize: 16 }}>
              Privacy Policy
            </Text>
          </View>
          <Btn
            textColor={bgColor}
            bgColor={neon}
            btnLabel="Signup"
            Press={() => {
              alert('Accoutn created');
              props.navigation.navigate('Login');
            }}
          />
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
            }}>
            <Text style={{ fontSize: 16, fontWeight: 'bold', color: 'white' }}>
              Already have an account ?{' '}
            </Text>
            <TouchableOpacity
              onPress={() => props.navigation.navigate('Login')}>
              <Text style={{ color: neon, fontWeight: 'bold', fontSize: 16 }}>
                Login
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Background>
  );
};

export default Signup;
