import { View, Text } from 'react-native';
import React from 'react';
import LottieView from 'lottie-react-native';

const LoadingSkeliton = () => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <LottieView
        source={require('../../assets/lottieFiles/loadingSkeliton.json')}
        autoPlay
        loop
        style={{ width: 200, height: 200 }}
      />
    </View>
  );
};

export default LoadingSkeliton;
