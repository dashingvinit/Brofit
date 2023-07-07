import { View, Text } from 'react-native';
import Background from './components/Background';
import React from 'react';

const Home = () => {
  return (
    <Background>
      <View style={{ marginHorizontal: 20, marginVertical: 100 }}>
        <Text style={{ color: 'white', fontSize: 48, fontWeight: 'bold' }}>
          Welcome to
        </Text>
      </View>
    </Background>
  );
};

export default Home;
