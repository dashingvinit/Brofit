import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import Gradient4 from '../Gradient4';
import TopBack from '../TopBack';
import React from 'react';
import { WorkoutPlanData } from '../../constants/Workouts';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';

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
            <LinearGradient
              colors={['transparent', 'rgba(0,0,0,0.8)']}
              style={styles.linearGradient}>
              <View>
                <Text style={styles.cardTitle}>{item.title}</Text>
                <Text style={styles.content}>{item.content}</Text>
              </View>
            </LinearGradient>
          </ImageBackground>
        </View>
      </TouchableOpacity>
    </View>
  );

  const getImageSource = (bg) => {
    switch (bg) {
      case 'grade1':
        return require('../../assets/images/chest.jpg');
      case 'grade2':
        return require('../../assets/images/calis.jpg');
      case 'grade3':
        return require('../../assets/images/bicep.jpg');
      case 'grade4':
        return require('../../assets/images/cardio.jpg');
      case 'grade5':
        return require('../../assets/images/pushupsimg.jpg');
      case 'grade6':
        return require('../../assets/images/CrunchesImage.jpg');
      default:
        return require('../../assets/images/CrunchesImage.jpg');
    }
  };

  return (
    <Gradient4 style={{ flex: 1 }}>
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
    </Gradient4>
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
    borderRadius: 20,
    overflow: 'hidden',
    marginBottom: 10,
  },
  linearGradient: {
    flex: 1,
    justifyContent: 'flex-end',
    padding: 10,
  },
  cardTitle: {
    fontSize: 20,
    color: 'rgba(255, 255, 255, 0.6)',
    fontWeight: 'bold',
    marginBottom: 5,
  },
  content: {
    fontSize: 24,
    color: 'rgba(255, 255, 255, 0.8)',
    fontWeight: 'bold',
    marginRight: 40,
    marginBottom: 10,
  },
  bottomSpace: {
    height: 300,
  },
});

export default WorkoutPlan;
