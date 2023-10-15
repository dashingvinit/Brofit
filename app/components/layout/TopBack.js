import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { bgGlassLight, neon } from '../../constants/Constants';
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
        <Ionicons name="arrow-back" size={30} style={styles.icon} />
      </TouchableOpacity>
      <Text style={{ color: 'white', fontSize: 21 }}>{children}</Text>
      <TouchableOpacity>
        <FontAwesome5 name="hamburger" size={30} color="transparent" />
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 30,
  },
  icon: {
    paddingVertical: 7,
    paddingHorizontal: 8,
    borderRadius: 100,
    backgroundColor: bgGlassLight,
    color: neon,
  },
});

export default TopBack;
