import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { bgGlass, bgGlassLight, neon } from '../../constants/Constants';

const WorkoutPrograms = ({ onTagPress }) => {
  const [selectedTags, setSelectedTags] = useState([]);

  const categories = [
    'Chest',
    'Shoulders',
    'Triceps',
    'Biceps',
    'Abs',
    'Quads',
    'Hamstrings',
    'Glutes',
    'Calves',
    'Lats',
    'Upperback',
    'Middleback',
    'Lowerback',
    'Forearms',
    'Traps',
  ];

  const handleTagPress = (tag) => {
    const newTags = [...selectedTags];

    if (newTags.includes(tag.toLowerCase())) {
      const index = newTags.indexOf(tag.toLowerCase());
      if (index !== -1) {
        newTags.splice(index, 1);
      }
    } else {
      newTags.push(tag.toLowerCase());
    }
    setSelectedTags(newTags);
    onTagPress(newTags);
  };

  return (
    <View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}>
        {categories.map((category, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.button,
              selectedTags.includes(category.toLowerCase()) &&
                styles.selectedButton, // Apply styles for selected tags
            ]}
            onPress={() => handleTagPress(category)}>
            <Text
              style={[
                styles.buttonText,
                selectedTags.includes(category.toLowerCase()) &&
                  styles.selectedButtonText, // Apply styles for selected tags
              ]}>
              {category}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  button: {
    backgroundColor: bgGlassLight,
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginRight: 10,
  },
  selectedButton: {
    backgroundColor: bgGlass,
    borderColor: neon,
    borderWidth: 1,
    paddingVertical: 9,
    paddingHorizontal: 19,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  selectedButtonText: {
    color: neon,
  },
});

export default WorkoutPrograms;
