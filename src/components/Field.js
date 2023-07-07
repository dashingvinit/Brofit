import React from 'react';
import { TextInput } from 'react-native';
import { bgColor, neon } from '../constants/Constants';

const Field = (props) => {
  return (
    <TextInput
      {...props}
      style={{
        borderRadius: 100,
        color: neon,
        paddingHorizontal: 10,
        width: '78%',
        backgroundColor: 'rgb(220,220, 220)',
        marginVertical: 10,
      }}
      placeholderTextColor={bgColor}></TextInput>
  );
};

export default Field;
