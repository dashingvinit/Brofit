import React from 'react';
import { View, Text } from 'react-native';
import { bgColor, bgGlass, bgGlassLight, neon } from '../../constants/Constants';

const MsgModal = ({ message }) => {
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: bgGlassLight,
      }}>
      <View
        style={{
          width: '80%',
          height: '12%',
          backgroundColor: '#000000b3',
          borderRadius: 15,
          justifyContent: 'center',
        }}>
        <View style={{ alignItems: 'center' }}>
          <Text style={{ fontSize: 18, color: neon }}>{message}</Text>
        </View>
      </View>
    </View>
  );
};

export default MsgModal;
