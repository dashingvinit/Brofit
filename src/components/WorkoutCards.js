import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';
import React from 'react';
import { Workouts, bgLight, neon } from '../constants/Constants';

const WorkoutCards = ({ navigation }) => {
  const goToDetails = () => {
    navigation.navigate('AnimatedVideos');
  };

  return (
    <View>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <Text style={styles.pageTitle}>Personalized Plan</Text>

        <TouchableOpacity onPress={goToDetails}>
          <View style={styles.textContainer1}>
            <Text style={styles.pageTitle2}>Tutorial</Text>
          </View>
        </TouchableOpacity>
      </View>
      <View style={styles.slideableImagesContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {Workouts.map((item, index) => (
            <View key={index} style={styles.slideableImage}>
              <Image source={item.image} style={styles.slideableImage} />
            </View>
          ))}
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  pageTitle: {
    color: 'white',
    margin: 10,
    fontSize: 20,
  },
  textContainer1: {
    padding: 10,
    backgroundColor: '#2a2f37',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
  },
  pageTitle2: {
    color: neon,
    fontSize: 20,
  },
  slideableImagesContainer: {
    marginHorizontal: 10,
    marginTop: 10,
  },
  slideableImage: {
    width: 380,
    height: 400,
    marginRight: 20,
    borderRadius: 10,
  },
});

export default WorkoutCards;
