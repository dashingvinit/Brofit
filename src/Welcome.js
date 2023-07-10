import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import Background from './components/Background';
import Btn from './components/Btn';
import { bgColor, neon } from './constants/Constants';

const Home = (props) => {
  return (
    <Background>
      <View style={{ marginHorizontal: 20, marginVertical: 100 }}>
        <Text style={{ color: 'white', fontSize: 48, fontWeight: 'bold' }}>
          Welcome to
        </Text>
        <Text
          style={{
            color: '#e6fd54',
            fontSize: 64,
            fontWeight: 'bold',
            marginBottom: 100,
          }}>
          Brofit+
        </Text>
        <Btn
          bgColor={neon}
          textColor={bgColor}
          btnLabel="Login"
          Press={() => props.navigation.navigate('Login')}
        />
        <Btn
          bgColor={bgColor}
          textColor={neon}
          btnLabel="Signup"
          // Press={() => props.navigation.navigate('ProfileSetup')}
          Press={() => props.navigation.navigate('Signup')}
        />
        <View
          style={{
            marginTop: 40,
            display: 'flex',
            justifyContent: 'center',
          }}>
          <Text
            style={{
              color: 'white',
              fontSize: 24,
              marginLeft: 10,
            }}>
            Are you a owner?
          </Text>
          <Btn
            bgColor={bgColor}
            textColor={neon}
            btnLabel="Owner Login"
            Press={() => props.navigation.navigate('OwnerLogin')}
          />
          <Btn
            bgColor={bgColor}
            textColor={neon}
            btnLabel="Home"
            Press={() => props.navigation.navigate('Home1')}
          />
        </View>
      </View>
    </Background>
  );
};

const styles = StyleSheet.create({});

export default Home;
