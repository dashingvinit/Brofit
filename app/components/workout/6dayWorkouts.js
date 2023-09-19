import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import { bgGlass, neon } from '../../constants/Constants';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NextBtn, TopBack } from '../../components';
import Video from './VideoPlayer';
import GradientBG from '../containers/GradientBG';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Workouts = ({ route }) => {
  const [workouts, setWorkouts] = useState([]);
  const [imageIndex, setImageIndex] = useState(0);
  const { item } = route.params;
  const exercises = item.exercises;

  const handlePress = (img, index) => {
    setImageIndex(index);
  };

  const handleNext = () => {
    setImageIndex((prevIndex) => (prevIndex + 1) % workouts.length);
  };

  useEffect(() => {
    setWorkouts(exercises);
  }, [exercises]); // Make sure to update workouts when exercises change

  // Check if workouts is empty or if imageIndex is out of bounds
  if (
    workouts.length === 0 ||
    imageIndex < 0 ||
    imageIndex >= workouts.length
  ) {
    return (
      <GradientBG>
        <SafeAreaView style={{ flex: 1 }}>
          <TopBack>{item.title}</TopBack>
          <Text>No workouts available</Text>
        </SafeAreaView>
      </GradientBG>
    );
  }

  return (
    <GradientBG>
      <SafeAreaView style={{ flex: 1 }}>
        <TopBack>{item.title}</TopBack>
        <Video image={workouts[imageIndex].video}>
          <NextBtn onPress={handleNext} />
        </Video>
        <ScrollView>
          <View style={{ paddingBottom: '20%', marginHorizontal: 10 }}>
            {workouts.map((workout, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => {
                  handlePress(workout.image, index);
                }}>
                <View style={styles.container}>
                  <Image
                    source={require('../../assets/images/boxer.jpg')}
                    style={{ height: 80, width: 80, borderRadius: 20 }}
                  />
                  <View>
                    <Text style={styles.header}>{workout.name}</Text>
                    <Text style={styles.footer}>Reps: {workout.reps}</Text>
                    <Text style={styles.footer}>Sets: {workout.sets}</Text>
                  </View>
                  <Ionicons
                    name="chevron-forward-outline"
                    size={25}
                    color="black"
                    backgroundColor={neon}
                    style={styles.icon}
                  />
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </SafeAreaView>
    </GradientBG>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: bgGlass,
    padding: 10,
    borderRadius: 20,
    marginVertical: 5,
  },
  icon: {
    marginLeft: 'auto',
    borderRadius: 100,
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  header: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
    marginLeft: 10,
  },
  footer: {
    fontSize: 14,
    color: 'white',
    marginTop: 3,
    marginLeft: 10,
  },
});

export default Workouts;
