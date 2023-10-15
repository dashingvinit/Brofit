import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { bgGlass, neon } from '../../constants/Constants';
import Ionicons from 'react-native-vector-icons/Ionicons';

const WorkoutClass = (props) => {
  const { data, navigation } = props;

  const workOutClasses = [
    {
      name: 'Monday',
      workouts: 15,
      image: require('../../assets/images/boxer.jpg'),
    },
    {
      name: 'Tuesday',
      workouts: 20,
      image: require('../../assets/images/calis.jpg'),
    },
    {
      name: 'Wednesday',
      workouts: 15,
      image: require('../../assets/images/yoga.jpg'),
    },
    {
      name: 'Thursday',
      workouts: 10,
      image: require('../../assets/images/home.jpg'),
    },
    {
      name: 'Friday',
      workouts: 15,
      image: require('../../assets/images/boxer.jpg'),
    },
    {
      name: 'Saturday',
      workouts: 20,
      image: require('../../assets/images/calis.jpg'),
    },
    {
      name: 'Sunday',
      workouts: 15,
      image: require('../../assets/images/yoga.jpg'),
    },
  ];

  return (
    <>
      {workOutClasses.map((item, index) => {
        return (
          <TouchableOpacity
            key={index}
            onPress={() => {
              navigation.navigate('ExerciseList', { item: item, data: data });
            }}>
            <View style={styles.container}>
              <Image
                source={item.image}
                style={{ height: 100, width: 100, borderRadius: 25 }}
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
                style={styles.icon}
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
    marginVertical: 5,
  },
  icon: {
    marginLeft: 'auto',
    borderRadius: 100,
    paddingVertical: 2,
    paddingHorizontal: 3,
  },
  header: {
    fontSize: 22,
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

export default WorkoutClass;
