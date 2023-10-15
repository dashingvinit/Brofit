import React, { useState } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Text,
} from 'react-native';
import {
  bgGlass,
  bgGlassLight,
  bgLight,
  neon,
} from '../../constants/Constants';

const Search = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState(null);

  const handleSearch = () => {
    onSearch(searchQuery);
    setSearchQuery('');
  };

  return (
    <View style={styles.searchContainer}>
      <TextInput
        style={styles.searchInput}
        placeholder="Search by ID"
        placeholderTextColor={'white'}
        onChangeText={(text) => setSearchQuery(text)}
        value={searchQuery}
      />
      <TouchableOpacity onPress={handleSearch} style={styles.searchButton}>
        <Text style={styles.searchButtonText}>Search</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 10,
    paddingVertical: 12,
  },
  searchInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: neon,
    backgroundColor: bgGlassLight,
    borderRadius: 20,
    padding: 8,
    marginRight: 8,
    color: neon,
    paddingLeft: 20,
  },
  searchButton: {
    backgroundColor: bgGlass,
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderRadius: 20,
  },
  searchButtonText: {
    color: neon,
    fontWeight: 'bold',
  },
});

export default Search;
