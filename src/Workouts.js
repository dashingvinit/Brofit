import { View, Text } from 'react-native';
import React, { useEffect, useState } from 'react';

const Workouts = ({ route }) => {
  const [workouts, setWorkouts] = useState([]);
  // Get the 'item' from route.params
  const { item } = route.params;
  const exercises = item.exercises;

  useEffect(() => {
    setWorkouts(exercises);
  }, []);

  return (
    <View>
      <Text>Workouts</Text>
      {workouts.map((workout) => (
        <View key={workout.name}>
          <Text>{workout.name}</Text>
          <Text>{workout.reps}</Text>
          <Text>{workout.sets}</Text>
        </View>
      ))}
    </View>
  );
};

export default Workouts;
