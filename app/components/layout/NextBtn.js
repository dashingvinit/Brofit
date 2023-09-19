import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { neon, bgGlassLight, bgGlass } from '../../constants/Constants';

const NextBtn = ({ onPress }) => {
  return (
    <View style={styles.buttonContainer}>
      <TouchableOpacity style={styles.button} onPress={onPress}>
        <View style={styles.row}>
          <Text
            style={{
              color: 'white',
              fontSize: 18,
              fontWeight: 'bold',
            }}>
            Next
          </Text>
          <Ionicons
            name="ios-arrow-forward-circle-outline"
            size={30}
            color="white"
          />
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
    alignItems: 'center',
  },
  buttonContainer: {
    position: 'absolute',
    right: 0,
    alignItems: 'center',
    marginTop: 10,
    marginRight: 10,
    zIndex: 1,
  },
  button: {
    backgroundColor: bgGlass,
    borderRadius: 25,
    padding: 10,
  },
});

export default NextBtn;
