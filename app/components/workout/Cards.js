import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import React from 'react';

const Cards = (data) => {
  return (
    <TouchableOpacity key={data?.id} style={styles.workoutCard}>
      <Image
        source={require('../../assets/images/bicep.jpg')}
        style={styles.img}
      />
      <View style={styles.textContainer}>
        <Text style={styles.workOutName}>Gym</Text>
        <Text style={styles.workOutLength}>18 WORKOUTS</Text>
      </View>
      <Ionicons name="heart-outline" size={24} style={styles.icon} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  workoutCard: {
    justifyContent: 'space-between',
    marginTop: 2,
    padding: 7,
    backgroundColor: 'white',
    height: 130,
    borderRadius: 30,
    width: '100%',

    flexDirection: 'row',
    gap: 20,
  },
  img: {
    height: '100%',
    width: '33%',
    borderRadius: 30,
  },
  textContainer: {
    flex: 1,
    justifyContent: 'space-between',
  },
  icon: {
    padding: 10,
    color: 'black',
  },
  workOutName: {
    fontWeight: 'bold',
    marginTop: 10,
    fontSize: 22,
    color: 'black',
  },
  workOutLength: {
    fontSize: 12,
    letterSpacing: 1,
    color: 'black',
    marginBottom: 10,
  },
});

export default Cards;
