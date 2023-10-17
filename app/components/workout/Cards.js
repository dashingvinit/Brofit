import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { s } from 'react-native-size-matters';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { get } from 'react-native/Libraries/TurboModule/TurboModuleRegistry';

const imagePaths = [
  require('../../assets/images/cardio.jpg'),
  require('../../assets/images/bell.jpg'),
  require('../../assets/images/ball.jpg'),
  require('../../assets/images/backBending.jpg'),
  require('../../assets/images/boobs.jpg'),
  require('../../assets/images/home.jpg'),
  require('../../assets/images/bicep.jpg'),
  require('../../assets/images/boxer.jpg'),
  require('../../assets/images/calis.jpg'),
  require('../../assets/images/chest.jpg'),
  require('../../assets/images/CrunchesImage.jpg'),
  require('../../assets/images/streching.jpg'),
  require('../../assets/images/homeWorkout.jpg'),
];

const getRandomImage = () => {
  const randomIndex = Math.floor(Math.random() * imagePaths.length);
  return imagePaths[randomIndex];
};

const Cards = ({ item, navigation, screen, getID, routine }) => {
  const [selectedCards, setSelectedCards] = useState([]);

  const handleTagPress = (tag) => {
    getID(tag);
    const newTags = [...selectedCards];

    if (newTags.includes(tag)) {
      const index = newTags.indexOf(tag);
      if (index !== -1) {
        newTags.splice(index, 1);
      }
    } else {
      newTags.push(tag);
    }
    setSelectedCards(newTags);
  };

  const handleCardPress = () => {
    if (getID) {
      handleTagPress(item._id);
    } else {
      const screenName =
        screen === 'ExerciseCards' ? 'ExerciseCards' : 'ExerciseScreen';
      navigation.navigate(screenName, { data: item, routine: routine });
    }
  };

  const randomImage = getRandomImage();

  return (
    <TouchableOpacity
      style={[
        styles.workoutCard,
        item.level ? styles.card : null,
        item.name ? styles.card2 : null,
        selectedCards.includes(item._id) && styles.selectedCard,
      ]}
      onPress={handleCardPress}>
      <Image
        source={item?.thumbnail ? { uri: item?.thumbnail } : randomImage}
        style={styles.img}
      />
      <View style={styles.textContainer}>
        <Text style={styles.workOutName}>
          {item?.name || item?.title || 'NO DATA'}
        </Text>
        <Text style={styles.workOutLength}>
          {item?.level
            ? `Trainer Routine\nLevel: ${item?.level}`
            : 'My Routine'}
        </Text>
      </View>
      <Ionicons
        name={item?.level || item?.name ? 'heart-outline' : 'heart'}
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
    height: 135,
    borderRadius: 30,
    width: '100%',
    flexDirection: 'row',
    gap: 20,
    alignItems: 'center',
    backgroundColor: '#D6D46D',
  },
  card: {
    backgroundColor: '#DE8F5F',
  },
  card2: {
    backgroundColor: '#FDF7C3',
  },
  selectedCard: {
    backgroundColor: 'lightblue',
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
    fontSize: 20,
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
