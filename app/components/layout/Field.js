import React from 'react';
import { TextInput, StyleSheet, View } from 'react-native';
import { bgColor, bgGlass, bgGlassLight, neon } from '../../constants/Constants';
import Feather from 'react-native-vector-icons/Feather';

const Field = (props) => {
  return (
    <View>
      <Feather
        name={props.icon}
        size={20}
        color={neon}
        style={{
          position: 'absolute',
          top: 25,
          right: 10,
          zIndex: 1,
          opacity: 0.5,
        }}
      />
      <TextInput
        {...props}
        style={styles.TextInput}
        placeholderTextColor={'#EEEEEE'}></TextInput>
    </View>
  );
};

const styles = StyleSheet.create({
  TextInput: {
    borderWidth: 1,
    borderColor: neon,
    borderRadius: 15,
    color: 'white',
    width: '100%',
    padding: 10,
    fontSize: 14,
    backgroundColor: bgGlass,
    marginVertical: 10,
  },
});

export default Field;
