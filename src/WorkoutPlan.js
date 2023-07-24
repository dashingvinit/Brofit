import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  Image,
} from 'react-native';
import { GradientBG } from './components';
import React from 'react';
import { bgColor, WorkoutPlanData } from './constants/Constants';

const WorkoutPlan = (props) => {
  const data = WorkoutPlanData;
  const renderItem = ({ item }) => (
    <View>
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
    </View>
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
    <GradientBG style={{ flex: 1 }}>
      <View style={styles.container}>
        <Text style={styles.header}>6 d workout plan</Text>
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={<Text>No plans available.</Text>}
          contentContainerStyle={{ paddingBottom: 180 }}
        />
      </View>
    </GradientBG>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 40,
    // backgroundColor: bgColor,
  },
  header: {
    fontSize: 30,
    fontWeight: 'bold',
    alignSelf: 'center',
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
  bottomSpace: {
    height: 300, // Add the height as per your requirement to create enough space at the bottom
  },
});

export default WorkoutPlan;
