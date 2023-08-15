import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';

export default function Btn({ bgColor, btnLabel, textColor, Press }) {
  return (
    <TouchableOpacity
      onPress={Press}
      style={{
        backgroundColor: bgColor,
        borderRadius: 20,
        alignItems: 'center',
        width: '100%',
        paddingVertical: 10,
        marginVertical: 10,
      }}>
      <Text
        style={{
          color: textColor,
          // fontFamily: 'Panton-BlackCaps',
          fontSize: 25,
          letterSpacing: 1,
        }}>
        {btnLabel}
      </Text>
    </TouchableOpacity>
  );
}
