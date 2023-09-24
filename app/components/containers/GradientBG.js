import React from 'react';
import { View, ImageBackground } from 'react-native';

const Background = ({ children }) => {
  return (
    <View style={{ flex: 1 }}>
      <ImageBackground
        //source={require('../assets/grade6.webp')}
        //source={require('../../assets/grade2.jpg')}
        source={require('../../assets/grade7.png')}
        style={{
          flex: 1,
          resizeMode: 'cover',
          width: '100%',
          height: '100%',
        }}
      />
      <View
        style={{
          flex: 1,
          position: 'absolute',
          width: '100%',
          height: '100%',
        }}>
        {children}
      </View>
    </View>
  );
};

export default Background;
