import { View, Text, Image } from 'react-native';
import React from 'react';

const Top = () => {
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        margin: 10,
        paddingTop: 40,
      }}>
      <Image
        source={require('../assets/images/timerback.jpg')}
        style={{ width: 65, height: 65, borderRadius: 50, marginRight: 10 }}
      />
      <View>
        <Text
          style={{
            fontSize: 12,
            fontWeight: 'bold',
            color: 'white',
          }}>
          Welcome Back
        </Text>
        <Text style={{ fontSize: 24, fontWeight: 'bold', color: 'white' }}>
          Arjun Negi
        </Text>
      </View>
    </View>
  );
};

export default Top;
