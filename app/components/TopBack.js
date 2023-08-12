import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { bgGlassLight } from '../constants/Constants';
import { TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const TopBack = ({ children }) => {

  const navigation = useNavigation();

  const handleBackPress = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleBackPress}>
        <Ionicons name="caret-back-outline" size={30} color="white" />
      </TouchableOpacity>

      <Text style={{ color: 'white', fontSize: 21 }}>{children}</Text>
      <TouchableOpacity>
        <FontAwesome5 name="grip-lines" size={30} color="transparent" />
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 0,
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingRight: 10,
    borderRadius: 30,
  },
});

export default TopBack;
