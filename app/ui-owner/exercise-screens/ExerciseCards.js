import React, { useState, useEffect } from 'react';
import { TopBack, GradientBG, Cards } from '../../components';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, ScrollView } from 'react-native';

const WorkoutCards = ({ route }) => {
  const { data, navigation } = route.params;
  const [workoutData, setWorkoutData] = useState([]);

  const weekDays = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday',
  ];

  const handlePress = (item) => () => {
    navigation.navigate('ExerciseScreen', { data: item });
  };

  useEffect(() => {
    const temp = data?.workout?.map((item) => {
      const day = item?.day;
      const workout = item?.workout;
      console.log('day', day);
      return { day, workout };
    });
    setWorkoutData(temp);
  }, []);

  return (
    <GradientBG>
      <SafeAreaView />
      <ScrollView>
        <TopBack>{data.title}</TopBack>
        <View style={{ marginBottom: 80 }}>
          {weekDays?.map((item, index) => (
            <Cards key={index} item={item} onPress={handlePress(item)} />
          ))}
        </View>
      </ScrollView>
    </GradientBG>
  );
};

export default WorkoutCards;
