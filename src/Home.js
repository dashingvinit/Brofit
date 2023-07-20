import React from 'react';
import { Graph, Top, WorkoutCards, Userstatusbox } from './components';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { bgColor, bgLight, neon } from './constants/Constants';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { FontAwesome } from '@expo/vector-icons';

const Home = (props) => {
  return (
    <View style={{ flex: 1, backgroundColor: bgColor, position: 'relative' }}>
      {/* Circular lights */}
      <View style={styles.lightTopLeft} />
      <View style={styles.lightTopRight} />
      <View style={styles.lightBottomLeft} />
      <View style={styles.lightBottomRight} />

      <Top
        navigation={props.navigation}
        setHandleLogout={props.setHandleLogout}
      />

      <ScrollView>
        <View style={styles.boxesContainer}>
          <View style={styles.box}>
            <Text style={styles.boxText}>
              <Ionicons
                name="ios-heart-outline"
                style={{
                  color: neon,
                }}
                size={50}
              />
            </Text>
            <Text>
              <Userstatusbox />
            </Text>
          </View>
          <View style={styles.box}>
            <TouchableOpacity
              onPress={() => props.navigation.navigate('PlanUpdate')}>
              <Text style={styles.boxText}>
                <Ionicons
                  name="ios-bar-chart"
                  style={{
                    color: neon,
                  }}
                  size={50}
                />
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.box}>
            <TouchableOpacity
              onPress={() => props.navigation.navigate('Timer')}>
              <Text style={{ fontSize: 40 }}>
                <Ionicons
                  name="ios-timer-outline"
                  style={{
                    color: neon,
                  }}
                  size={50}
                />
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <Graph />
        <WorkoutCards navigation={props.navigation} />
      </ScrollView>
    </View>
  );
};

const commonLightStyles = {
  width: 300,
  height: 300,
  borderRadius: 150,
  position: 'absolute',
  opacity: 0.5,
  background: 'conic-gradient(rgba(255, 255, 255, 0.8) 100%, transparent 70%)',
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
    color: neon,
  },

  lightTopLeft: {
    ...commonLightStyles,
    top: -150,
    left: -150,
  },
  lightTopRight: {
    ...commonLightStyles,
    top: -150,
    right: -150,
  },
  lightBottomLeft: {
    ...commonLightStyles,
    bottom: -150,
    left: -150,
  },
  lightBottomRight: {
    ...commonLightStyles,
    bottom: -150,
    right: -150,
  },
});

export default Home;
