import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { bgColor, bgGlassLight, neon } from '../constants/Constants';

const Gender = ({ onSelect }) => {
  const genders = [
    { label: 'Male', value: 'male', color: '#E7AB79', icon: 'male' },
    { label: 'Female', value: 'female', color: '#ED8D8D', icon: 'female' },
    { label: 'C++', value: 'other', color: '#DDDDDD', icon: 'male-female' },
  ];

  const [selectedGender, setSelectedGender] = useState(null);

  const handleGenderSelect = (gender) => {
    if (selectedGender === gender) {
      setSelectedGender(null);
    } else {
      setSelectedGender(gender);
      onSelect(gender);
    }
  };

  const isGenderSelected = (gender) => {
    return selectedGender === gender;
  };

  return (
    <View style={styles.container}>
      {genders.map(({ label, value, color, icon }) => (
        <TouchableOpacity
          key={value}
          style={[
            styles.card,
            { backgroundColor: color },
            isGenderSelected(value) && styles.selectedCard,
          ]}
          onPress={() => handleGenderSelect(value)}>
          <View style={{ alignItems: 'center', justifyContent: 'center' }}>
            <Ionicons name={icon} size={50} color={bgColor} />
            <Text style={{ textAlign: 'center', fontSize: 14 }}>{label}</Text>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    justifyContent: 'space-between',
  },
  card: {
    borderRadius: 10,
    width: '30%',
    marginVertical: 5,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#404258',
    borderBottomWidth: 2,
  },
  selectedCard: {
    borderWidth: 2,
    borderColor: neon,
    backgroundColor: neon,
  },
});

export default Gender;
