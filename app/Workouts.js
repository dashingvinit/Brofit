import {
  View,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  GradientBG,
  WorkoutClass,
  Runtimer,
  WorkoutPrograms,
} from './components';
import { SixdayWorkOut } from './assets/images';

const Workouts = (props) => {
  return (
    <GradientBG>
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView>
          <Runtimer />
          <TouchableOpacity
            onPress={() => {
              props.navigation.navigate('SixDayWorkoutPlan');
            }}>
            <View style={styles.card}>
              <ImageBackground
                source={SixdayWorkOut}
                style={styles.imageBackground}
                resizeMode="cover"
              />
            </View>
          </TouchableOpacity>
          <WorkoutPrograms />
          <View style={{ marginHorizontal: 10, paddingBottom: 80 }}>
            <WorkoutClass navigation={props.navigation} />
          </View>
        </ScrollView>
        {/* <View style={styles.BottomContainer}>
          <Text style={styles.BottomContainerText}>Workouts</Text>
          <ScrollView></ScrollView>
        </View> */}
      </SafeAreaView>
    </GradientBG>
  );
};

const styles = StyleSheet.create({
  card: {
    height: 250,
    margin: 10,
    borderRadius: 20,
    overflow: 'hidden',
  },
  imageBackground: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  BottomContainer: {
    flex: 1,
    backgroundColor: 'black',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    bottom: 0,
    width: '100%',
    paddingBottom: 100,
  },
  BottomContainerText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 20,
  },
});

export default Workouts;
