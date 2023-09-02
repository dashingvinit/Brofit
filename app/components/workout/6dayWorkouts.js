import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { bgGlass, neon } from '../../constants/Constants';
import { SafeAreaView } from 'react-native-safe-area-context';
import Video from './VideoPlayer';
import TopBack from '../TopBack';
import GradientBG from '../GradientBG';
import Gradient4 from '../Gradient4';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Workouts = ({ route }) => {
  const [workouts, setWorkouts] = useState([]);
  const { item } = route.params;
  const exercises = item.exercises;

  useEffect(() => {
    setWorkouts(exercises);
  }, []);

  return (
    <Gradient4>
      <SafeAreaView style={{ flex: 1 }}>
        <TopBack>{item.title}</TopBack>
        <Video />
        <ScrollView>
          <View style={{ paddingBottom: '20%', marginHorizontal: 10 }}>
            {workouts.map((workout, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => {
                  //props.navigation.navigate('Programs');
                }}>
                <View style={styles.container}>
                  <Image
                    source={require('../../assets/images/boxer.jpg')}
                    style={{ height: 80, width: 80, borderRadius: 20 }}
                  />
                  <View style={styles.row}>
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
    </Gradient4>
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
