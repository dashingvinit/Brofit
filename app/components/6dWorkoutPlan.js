import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  Image,
} from 'react-native';
import GradientBG from './GradientBG';
import TopBack from './TopBack';
import React from 'react';
import { WorkoutPlanData } from '../constants/Constants';
import { SafeAreaView } from 'react-native-safe-area-context';

const WorkoutPlan = (props) => {
  const data = WorkoutPlanData;
  const renderItem = ({ item }) => (
    <View style={{ marginHorizontal: 10, paddingTop: 10 }}>
      <TouchableOpacity
        onPress={() => props.navigation.navigate('DayWiseWorkouts', { item })}>
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
        return require('../assets/grade1.jpg');
      case 'grade2':
        return require('../assets/grade2.jpg');
      case 'grade3':
        return require('../assets/grade3.jpg');
      default:
        return require('../assets/grade1.jpg'); // Provide a default image if bg doesn't match any case
    }
  };

  return (
    <GradientBG style={{ flex: 1 }}>
      <SafeAreaView style={{ flex: 1 }}>
        <TopBack>6 day WorkOut</TopBack>
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={<Text>No plans available.</Text>}
          contentContainerStyle={{ paddingBottom: 180 }}
        />
      </SafeAreaView>
    </GradientBG>
  );
};

const styles = StyleSheet.create({
  header: {
    fontSize: 30,
    fontWeight: 'bold',
    alignSelf: 'center',
    color: 'white',
    marginBottom: 20,
  },
  cardContainer: {
    minHeight: 210,
    maxHeight: 300,
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
