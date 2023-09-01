import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { bgGlassLight, neon } from '../../constants/Constants';

const WorkoutPrograms = () => {
  const categories = [
    'All',
    'Upper Body',
    'Lower Body',
    'Chest',
    'Abs',
    'Cardio',
    'Yoga',
    'Weight Loss',
    'Weight Gain',
    'Boxing',
    'Home Workout',
    'Calisthenics',
  ];

  return (
    <View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginHorizontal: 10,
        }}>
        <Text style={styles.title}>Workout Programs</Text>
        <Text style={styles.btn}>See all</Text>
      </View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}>
        {categories.map((category, index) => (
          <TouchableOpacity key={index} style={styles.button}>
            <Text style={styles.buttonText}>{category}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    marginVertical: 10,
  },
  btn: {
    fontSize: 16,
    fontWeight: 'bold',
    marginVertical: 10,
    color: neon,
  },
  scrollContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  button: {
    backgroundColor: bgGlassLight,
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginRight: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default WorkoutPrograms;
