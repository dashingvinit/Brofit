import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { bgGlass, bgGlassLight, neon } from '../../constants/Constants';
import Ionicons from 'react-native-vector-icons/Ionicons';

const WorkoutClass = (props) => {
  const workOutClasses = [
    {
      name: 'Boxing',
      workouts: 15,
      image: require('../../assets/images/boxer.jpg'),
    },
    {
      name: 'calisthenics',
      workouts: 20,
      image: require('../../assets/images/calis.jpg'),
    },
    {
      name: 'Yoga',
      workouts: 15,
      image: require('../../assets/images/yoga.jpg'),
    },
    {
      name: 'Home Workouts',
      workouts: 10,
      image: require('../../assets/images/home.jpg'),
    },
  ];

  return (
    <>
      {workOutClasses.map((item, index) => {
        return (
          <TouchableOpacity
            key={index}
            onPress={() => {
              props.navigation.navigate('Programs');
            }}>
            <View style={styles.container}>
              <Image
                source={item.image}
                style={{ height: 80, width: 80, borderRadius: 20 }}
              />
              <View style={styles.row}>
                <Text style={styles.header}>{item.name}</Text>
                <Text style={styles.footer}>{item.workouts}</Text>
              </View>
              <Ionicons
                name="chevron-forward-outline"
                size={25}
                color="black"
                backgroundColor={neon}
                style={{
                  marginLeft: 'auto',
                  borderRadius: 100,
                  paddingVertical: 2,
                  paddingHorizontal: 3,
                }}
              />
            </View>
          </TouchableOpacity>
        );
      })}
    </>
  );
};
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: bgGlass,
    padding: 10,
    borderRadius: 20,
    marginVertical: 10,
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'white',
    marginLeft: 10,
  },
  footer: {
    fontSize: 14,
    color: bgGlassLight,
    marginTop: 3,
    marginLeft: 10,
  },
});

export default WorkoutClass;
