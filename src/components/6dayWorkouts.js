import { View, Text, StyleSheet, ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react';
import { bgColor, bgGlass, bgLight, neon } from '../constants/Constants';
import { SafeAreaView } from 'react-native-safe-area-context';
import LottieView from 'lottie-react-native';
import TopBack from './TopBack';
import GradientBG from './GradientBG';

const Workouts = ({ route }) => {
  const [workouts, setWorkouts] = useState([]);
  // Get the 'item' from route.params
  const { item } = route.params;
  const exercises = item.exercises;

  useEffect(() => {
    setWorkouts(exercises);
  }, []);

  return (
    <GradientBG>
      <View style={styles.container}>
        <SafeAreaView>
          <TopBack>{item.title}</TopBack>
          <Text style={styles.content}>{item.content}</Text>
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
        </SafeAreaView>
      </View>
    </GradientBG>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headers: {
    fontSize: 32,
    fontWeight: 'bold',
    color: neon,
    textAlign: 'center',
    marginBottom: 5,
  },
  content: {
    fontSize: 20,
    color: 'white',
    textAlign: 'center',
    marginBottom: 20,
  },
  cards: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: bgGlass,
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
