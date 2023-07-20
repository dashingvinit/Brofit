import { View, Text, StyleSheet, ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react';
import { bgColor, bgLight, neon } from './constants/Constants';
import LottieView from 'lottie-react-native';

const Workouts = ({ route }) => {
  const [workouts, setWorkouts] = useState([]);
  // Get the 'item' from route.params
  const { item } = route.params;
  const exercises = item.exercises;

  useEffect(() => {
    setWorkouts(exercises);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.headers}>Workouts</Text>
      <ScrollView>
        <View style={{ paddingBottom: 100 }}>
          {workouts.map((workout) => (
            <View style={styles.cards} key={workout.name}>
              {/* <LottieView
              style={styles.lottieContainer}
              source={workout.lottieFile}
              autoPlay
              loop
            /> */}
              <Text style={styles.wHeading}>{workout.name}</Text>
              <View style={styles.contentCard}>
                <Text>Reps: {workout.reps}</Text>
                <Text>Sets: {workout.sets}</Text>
              </View>
              <View>
                {/* <Text style={styles.wHeading}>{workout.name}</Text>
              <View style={styles.contentCard}>
                <Text>Reps: {workout.reps}</Text>
                <Text>Sets: {workout.sets}</Text>
              </View> */}
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    backgroundColor: bgColor,
  },
  headers: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    marginBottom: 20,
  },
  cards: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: bgLight,
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
    marginHorizontal: 20,
  },
  lottieContainer: {
    flex: 2, // Take 1/3 of the card's width
    marginLeft: 100, // Add spacing between Lottie animation and text
  },
  wHeading: {
    fontSize: 20,
    fontWeight: 'bold',
    paddingBottom: 10,
    color: 'white',
  },
  contentCard: {
    backgroundColor: neon,
    borderRadius: 10,
    width: '100%',
    padding: 10,
    flex: 2, // Take 2/3 of the card's width
  },
});

export default Workouts;
