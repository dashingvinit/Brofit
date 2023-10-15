import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import React, { useState } from 'react';

const imagePaths = [
  require('../../assets/images/home.jpg'),
  require('../../assets/images/bicep.jpg'),
  require('../../assets/images/boxer.jpg'),
  require('../../assets/images/calis.jpg'),
  require('../../assets/images/chest.jpg'),
  require('../../assets/images/CrunchesImage.jpg'),
];

const getRandomImage = () => {
  const randomIndex = Math.floor(Math.random() * imagePaths.length);
  return imagePaths[randomIndex];
};

const Cards = ({ item, navigation, screen, getID }) => {
  const [selected, setSelected] = useState(false);

  const handleCardPress = async () => {
    if (getID) {
      getID(item._id);
      setSelected(true);
    } else {
      const screenName =
        screen === 'ExerciseCards' ? 'ExerciseCards' : 'ExerciseScreen';
      navigation.navigate(screenName, { data: item });
    }
  };

  const randomImage = getRandomImage();

  return (
    <TouchableOpacity
      style={[styles.workoutCard, selected && styles.selectedCard]}
      onPress={handleCardPress}>
      <Image
        source={item?.thumbnail ? { uri: item?.thumbnail } : randomImage}
        style={styles.img}
      />
      <View style={styles.textContainer}>
        <Text style={styles.workOutName}>{item?.name || item?.title}</Text>
        <Text style={styles.workOutLength}>
          {item?.level ? `Owner Level: ${item.level}` : 'My Routine'}
        </Text>
      </View>
      <Ionicons
        name={item.level ? 'heart-outline' : 'heart'}
        size={28}
        style={styles.icon}
      />
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
  selectedCard: {
    backgroundColor: 'lightblue', // Change the background color when selected
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
    textTransform: 'uppercase',
    fontSize: 12,
    letterSpacing: 1,
    color: 'black',
    marginBottom: 10,
  },
});

export default Cards;
