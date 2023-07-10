import React from 'react';
import { Graph, Top, WorkoutCards } from './components';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { bgColor, bgLight, neon } from './constants/Constants';
import { FontAwesome } from '@expo/vector-icons';

const Home = (props) => {
  return (
    <View style={{ backgroundColor: bgColor }}>
      <Top />
      <ScrollView>
        <View style={styles.boxesContainer}>
          <View style={styles.box}>
            <Text style={styles.boxText}>Box 1</Text>
          </View>
          <View style={styles.box}>
            <Text style={styles.boxText}>Box 2</Text>
          </View>
          <View style={styles.box}>
          <TouchableOpacity onPress={() => props.navigation.navigate('Timer')}>
              <Text style={{fontSize: 40}}>⏱️</Text>
          </TouchableOpacity>
          </View>
        </View>
        <Graph />
        <WorkoutCards navigation={props.navigation} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  boxesContainer: {
    marginTop: 10,
    flexDirection: 'row',
  },
  box: {
    flex: 1,
    height: 130,
    backgroundColor: bgLight,
    margin: 6,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
  },
  boxText: {
    fontSize: 35,
    fontWeight: 'bold',
    color: neon,
  },
});

export default Home;
