import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { neon } from '../../constants/Constants';

const SearchBox = ({ handleSearch }) => {
  const handleFunction = () => {
    try {
      handleSearch();
    } catch (error) {
      console.log('search error', error);
    }
  };

  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        gap: 3,
        marginBottom: 20,
      }}>
      <TextInput
        style={{
          flex: 1,
          color: 'white',
          fontSize: 20,

          height: 40,
          borderColor: '#ccc',
          borderWidth: 1,
          borderRadius: 15,

          paddingHorizontal: 10,
          paddingLeft: 30,
          fontStyle: 'italic',
        }}
        placeholder="Search by name or tags"
        placeholderTextColor="#ccc"
      />
      <Ionicons
        name="search-outline"
        size={20}
        style={{
          position: 'absolute',
          color: '#ccc',
          left: 5,
          alignContent: 'center',
        }}
      />

      <TouchableOpacity
        style={{
          backgroundColor: 'black',
          padding: 10,
          borderRadius: 15,
          alignItems: 'center',
        }}
        onPress={handleFunction}>
        <Ionicons name="search-outline" size={24} color={neon} />
      </TouchableOpacity>
    </View>
  );
};

export default SearchBox;
