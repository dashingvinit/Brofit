import React from 'react';
import { Graph, Top, CheckedIn, OwnerStatus } from '../components';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { bgColor, bgLight, neon } from '../constants/Constants';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { FontAwesome } from '@expo/vector-icons';

const Home = (props) => {
  return (
    <View style={{ backgroundColor: bgColor, flex: 1 }}>
      <Top
        navigation={props.navigation}
        setHandleLogout={props.setHandleLogout}
      />
      <ScrollView>
        <View style={styles.boxesContainer}>
          <View style={styles.box}>
            <TouchableOpacity
              onPress={() => props.navigation.navigate('ActiveList')}>
              <View style={{ alignItems: 'center' }}>
                <Ionicons
                  name="list-outline"
                  style={{
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
              onPress={() => props.navigation.navigate('InactiveList')}>
              <View style={{ alignItems: 'center' }}>
                <Ionicons
                  name="list-outline"
                  style={{
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
            <Text style={{ fontSize: 40 }}>
              <Ionicons
                name="person"
                style={{
                  color: neon,
                }}
                size={50}
              />
            </Text>
            <OwnerStatus />
          </View>
        </View>
        <Graph />
        <CheckedIn navigation={props.navigation} />

        {/* <WorkoutCards navigation={props.navigation} /> */}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  boxesContainer: {
    // marginTop: 10,
    // marginBottom: 10,
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
});

export default Home;
