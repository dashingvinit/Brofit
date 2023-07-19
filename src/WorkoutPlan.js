import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import React from 'react';
import { bgColor } from './constants/Constants';

const WorkoutPlan = (props) => {
  const data = [
    {
      id: '1',
      title: 'Day 1',
      content: 'Shoulders, chest, and core',
      bg: 'grade1',
    },
    { id: '2', title: 'Day 2', content: 'Content for Card 2', bg: 'grade2' },
    { id: '3', title: 'Day 3', content: 'Content for Card 3', bg: 'grade3' },
    { id: '4', title: 'Day 4', content: 'Content for Card 1', bg: 'grade1' },
    { id: '5', title: 'Day 5', content: 'Content for Card 2', bg: 'grade2' },
    { id: '6', title: 'Day 6', content: 'Content for Card 3', bg: 'grade3' },
  ];

  const renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => props.navigation.navigate('Workouts', { item })}>
      <View>
        <ImageBackground
          source={getImageSource(item.bg)}
          style={styles.cardContainer}
          resizeMode="cover">
          <View>
            <Text style={styles.cardTitle}>{item.title}</Text>
            <Text style={styles.content}>{item.content}</Text>
          </View>
        </ImageBackground>
      </View>
    </TouchableOpacity>
  );

  const getImageSource = (bg) => {
    switch (bg) {
      case 'grade1':
        return require('./assets/grade1.jpg');
      case 'grade2':
        return require('./assets/grade2.jpg');
      case 'grade3':
        return require('./assets/grade3.jpg');
      default:
        return require('./assets/grade1.jpg'); // Provide a default image if bg doesn't match any case
    }
  };

  return (
    <View style={styles.container}>
      <View>
        <View style={{ alignContent: 'center', alignItems: 'center' }}>
          <Text style={styles.header}>Workout Plan</Text>
        </View>

        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={<Text>No plans available.</Text>}
          contentContainerStyle={styles.flatListContainer}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 40,
    backgroundColor: bgColor,
  },
  header: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 20,
  },

  cardContainer: {
    height: 200,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    overflow: 'hidden',
    marginBottom: 20,
  },
  cardBackground: {
    paddingHorizontal: 16,
    marginTop: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
  },
  cardTitle: {
    fontSize: 18,
    color: 'rgba(255, 255, 255, 0.8)',
    fontWeight: 'bold',
    marginBottom: 8,
  },
  content: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.8)',
  },
});

export default WorkoutPlan;
