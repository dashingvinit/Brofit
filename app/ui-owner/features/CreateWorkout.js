import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { neon } from '../../constants/Constants';
import { SearchBox, Cards } from '../../components';

const CreateWorkout = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState('');

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const selectOption = (option) => {
    setSelectedOption(option);
    toggleDropdown();
  };

  return (
    <View style={styles.container}>
      <SafeAreaView />

      <Text style={styles.heading}>WORKOUT</Text>
      <SearchBox placeholder="Search" />

      <View style={styles.dropDownContainer}>
        <View>
          <TouchableOpacity
            style={styles.dropdownButton}
            onPress={toggleDropdown}>
            <Text style={styles.level}>
              {selectedOption || 'Select an option'}
            </Text>
            <Ionicons
              name={isDropdownOpen ? 'chevron-up' : 'chevron-down'}
              size={24}
              color={neon}
            />
          </TouchableOpacity>

          {isDropdownOpen && (
            <View>
              <TouchableOpacity onPress={() => selectOption('Brofit')}>
                <Text style={styles.levelOptions}>Brofit</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => selectOption('My Plans')}>
                <Text style={styles.levelOptions}>My PLans</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => selectOption('Owner Plans')}>
                <Text style={styles.levelOptions}>Owner Plans</Text>
              </TouchableOpacity>
            </View>
          )}
          <Text style={[styles.workOutLength, { color: 'white' }]}>
            FITNESS PLAN
          </Text>
        </View>

        <View style={styles.row}>
          <TouchableOpacity style={styles.iconBtn}>
            <Ionicons name="add" size={24} color={neon} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconBtn}>
            <Ionicons name="heart" size={24} color={neon} />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.separator} />
      <Cards />
      <Cards />
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 2,
  },
  container: {
    flex: 1,
    marginHorizontal: 10,
  },
  heading: {
    fontSize: 60,
    fontWeight: 'bold',
    color: 'white',
    fontStyle: 'italic',
    marginBottom: 20,
  },
  dropDownContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingHorizontal: 7,
  },
  dropdownButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  level: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  levelOptions: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'grey',
  },
  iconBtn: {
    padding: 10,
    backgroundColor: 'black',
    borderRadius: 100,
  },
  separator: {
    borderBottomColor: '#ccc',
    borderBottomWidth: StyleSheet.hairlineWidth,
    marginBottom: 10,
    marginHorizontal: 7,
  },
});

export default CreateWorkout;
