import React from 'react';
import { View, Text } from 'react-native';
import { bgColor, neon } from '../constants/Constants';

const MsgModal = ({ message }) => {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: "#00000099" }}>
      <View style={{ width: '65%', height: '12%', backgroundColor: bgColor, borderRadius: 25, justifyContent: 'center' }}>
        <View style={{ alignItems: 'center' }}>
          <Text style={{ fontSize: 18, color: neon }}>{message}</Text>
        </View>
      </View>
    </View>
  );
};

export default MsgModal;