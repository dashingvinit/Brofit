import React from 'react';
import {
  Graph,
  Top,
  WorkoutCards,
  Runtimer,
  Userstatusbox,
  GradientBG,
} from './components';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import { SixdayWorkOut } from './assets/images';
import { bgColor, bgLight, neon } from './constants/Constants';
import Ionicons from 'react-native-vector-icons/Ionicons';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const Home = (props) => {
  return (
    <GradientBG>
      <View style={{ flex: 1 }}>
        <Top
          navigation={props.navigation}
          setHandleLogout={props.setHandleLogout}
        />

        <ScrollView>
          <View style={styles.boxesContainer}>
            <View style={styles.box}>
              <Userstatusbox />
            </View>
            <View style={styles.box}>
              <TouchableOpacity
                onPress={() => props.navigation.navigate('PlanUpdate')}>
                <View style={{ alignItems: 'center' }}>
                  <MaterialCommunityIcons
                    name="shield-crown-outline"
                    style={{
                      // color: '#ffd700',
                      color: neon,
                    }}
                    size={50}
                  />
                  <Text style={{ fontSize: 20, color: 'white' }}>Plan</Text>
                  <Text
                    style={{ color: 'white', fontWeight: '100', fontSize: 14 }}>
                    Selected
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
            <View style={styles.box}>
              <TouchableOpacity
                onPress={() => props.navigation.navigate('Timer')}>
                <View style={{ alignItems: 'center' }}>
                  <Ionicons
                    name="ios-timer-outline"
                    style={{
                      color: neon,
                    }}
                    size={50}
                  />
                  <Text style={{ fontSize: 20, color: 'white' }}>Track</Text>
                  <Text
                    style={{ color: 'white', fontWeight: '100', fontSize: 14 }}>
                    Time
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
          <Graph />
          <Runtimer />
          {/* <WorkoutCards navigation={props.navigation} /> */}
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
        </ScrollView>
      </View>
    </GradientBG>
  );
};

const styles = StyleSheet.create({
  boxesContainer: {
    flexDirection: 'row',
  },
  box: {
    flex: 1,
    height: 120,
    backgroundColor: bgLight,
    margin: 6,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
  },
  boxText: {
    color: 'white',
    alignItems: 'center',
  },
  card: {
    height: 250,
    margin: 10,
    borderRadius: 20,
    overflow: 'hidden',
    marginBottom: 200,
  },
  imageBackground: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
});

export default Home;
