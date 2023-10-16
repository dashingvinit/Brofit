import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import React, { useState } from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { neon } from '../../constants/Constants';
import WorkoutPrograms from './WorkoutPrograms';
import CreateWorkout from './CreateWorkout';
import Axios from '../../constants/Axios';

const SearchBox = ({ onSearch }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchName, setSearchName] = useState('');
  const [selectedTags, setSelectedTags] = useState([]);
  const [fittnessLevel, setFittnessLevel] = useState('Beginner');

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const selectOption = (option) => {
    setFittnessLevel(option);
    toggleDropdown();
  };

  const handleTagPress = async (tags) => {
    setSelectedTags(tags);
    setSearchName('');
  };

  const handleSearch = async () => {
    try {
      let searchData, data;

      if (selectedTags.length > 0) {
        const query = selectedTags
          .filter((tag) => tag)
          .map((tag) => `-${tag}`)
          .join('');
        searchData = await Axios.get(
          `/workout/?tags=${fittnessLevel.toLowerCase()}${query}`
        );
        data = searchData.data.data;
      } else if (searchName) {
        searchData = await Axios.get(`/workout/${searchName}`);
        data = [searchData.data.data];
      } else {
        return;
      }

      onSearch(data);
    } catch (error) {
      console.log('search error', error);
    }
  };

  const handleReset = () => {
    setFittnessLevel('Beginner');
    const data = [];
    onSearch(data);
  };

  return (
    <>
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          placeholder="Exact name or use tags"
          placeholderTextColor="#ccc"
          value={searchName}
          onChangeText={(text) => {
            setSearchName(text);
            setSelectedTags([]);
          }}
        />

        <Ionicons name="search-outline" size={24} style={styles.searchIcon} />
        <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
          <Ionicons name="search-outline" size={30} color={neon} />
        </TouchableOpacity>
      </View>
      <WorkoutPrograms onTagPress={handleTagPress} />
      <View style={styles.dropDownContainer}>
        <View>
          <TouchableOpacity
            style={styles.dropdownButton}
            onPress={toggleDropdown}>
            <Text style={styles.level}>{fittnessLevel || 'Beginner'}</Text>
            <Ionicons
              name={isDropdownOpen ? 'chevron-up' : 'chevron-down'}
              size={24}
              color={neon}
            />
          </TouchableOpacity>

          {isDropdownOpen ? (
            <View style={{ marginTop: 5 }}>
              <TouchableOpacity onPress={() => selectOption('Beginner')}>
                <Text style={styles.levelOptions}>Beginner</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => selectOption('Intermediate')}>
                <Text style={styles.levelOptions}>Intermediate</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => selectOption('Advanced')}>
                <Text style={styles.levelOptions}>Advanced</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <Text style={[styles.fittnesPlan, { color: 'white' }]}>
              FITNESS LEVEL
            </Text>
          )}
        </View>

        <View style={styles.row}>
          <CreateWorkout />
          <TouchableOpacity style={styles.iconBtn}>
            <Ionicons name="heart" size={28} color={neon} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconBtn} onPress={handleReset}>
            <Ionicons name="md-file-tray-full-outline" size={28} color={neon} />
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
  },
  input: {
    color: 'white',
    fontSize: 20,
    height: 50,
    width: '85%',
    borderColor: neon,
    borderWidth: 1,
    borderRadius: 15,
    paddingHorizontal: 10,
    paddingLeft: 30,
    fontStyle: 'italic',
  },
  searchIcon: {
    position: 'absolute',
    color: 'white',
    left: 4,
    alignContent: 'center',
  },
  searchButton: {
    flex: 1,
    width: '15%',
    backgroundColor: 'black',
    padding: 10,
    borderRadius: 15,
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 2,
  },
  dropDownContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingHorizontal: 7,
    marginVertical: 10,
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
    fontSize: 18,
    color: '#ccc',
  },
  fittnesPlan: {
    fontSize: 12,
  },
  iconBtn: {
    paddingHorizontal: 11,
    paddingVertical: 10,
    backgroundColor: 'black',
    borderRadius: 100,
  },
});

export default SearchBox;
