import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';

export default function Btn({ bgColor, btnLabel, textColor, Press }) {
  return (
    <TouchableOpacity
      onPress={Press}
      style={{
        backgroundColor: bgColor,
        borderRadius: 100,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 5,
        marginVertical: 10,
        marginRight: 10,
        marginLeft: 10,
      }}>
      <View style={{ color: textColor, fontSize: 24, fontWeight: 'bold' }}>
        {btnLabel}
      </View>
    </TouchableOpacity>
  );
}
