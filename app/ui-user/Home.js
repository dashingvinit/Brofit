import React, { useEffect } from 'react';
import { Graph, Top, Runtimer, Userstatusbox, GradientBG } from '../components';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import * as SecureStore from 'expo-secure-store';
import { SixdayWorkOut } from '../assets/images';
import { bgGlass, neon } from '../constants/Constants';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const Home = (props) => {
  useEffect(() => {
    fetch();
  }, []);

  const fetch = async () => {
    try {
      const userString = await SecureStore.getItemAsync('profileSet');
      SecureStore.setItemAsync('a', 'true');
      if (userString === 'false') {
        props.navigation.navigate('ProfileSetup');
        //setprofile(true);
      }
    } catch (error) {
      console.log('User Profile Error', error);
    }
  };

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
                      color: neon,
                    }}
                    size={50}
                  />
                  <Text
                    style={{
                      fontSize: 20,
                      fontWeight: 'bold',
                      color: 'white',
                    }}>
                    Plan
                  </Text>
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
                  <Text
                    style={{
                      fontSize: 20,
                      fontWeight: 'bold',
                      color: 'white',
                    }}>
                    Track
                  </Text>
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

          <TouchableOpacity
            onPress={() => {
              props.navigation.navigate('WorkoutStack');
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
    backgroundColor: bgGlass,
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
