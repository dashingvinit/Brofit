import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
  Animated,
} from 'react-native';
import { Video, ResizeMode } from 'expo-av';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { GradientBG } from '../../components';
import { bgGlassLight, neon } from '../../constants/Constants';
import { SafeAreaView } from 'react-native-safe-area-context';

const ExerciseScreen = ({ route }) => {
  const video = React.useRef(null);
  const [status, setStatus] = React.useState({});
  const [showVideo, setShowVideo] = useState(false); // State variable to control video visibility

  const navigation = useNavigation();
  const { data } = route.params;
  const [scrollY] = useState(new Animated.Value(0));

  const handleBackPress = () => {
    navigation.goBack();
  };

  const onStartWorkout = () => {
    setShowVideo(true); // Show the video when "Start Workout" is pressed
  };

  const translateY = scrollY.interpolate({
    inputRange: [0, 300], // Adjust 300 to control when the transition occurs
    outputRange: [0, -250], // Adjust -250 to control the translation amount
    extrapolate: 'clamp',
  });

  return (
    <GradientBG>
      <SafeAreaView />
      <ScrollView
        style={styles.scroll}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false }
        )}
        scrollEventThrottle={16}>
        <View style={styles.container}>
          <View style={styles.thumbnailContainer}>
            <View style={styles.iconContainer}>
              <TouchableOpacity onPress={handleBackPress}>
                <Ionicons name="arrow-back" size={24} style={styles.icon} />
              </TouchableOpacity>
              <TouchableOpacity>
                <Ionicons name="heart-outline" size={24} style={styles.icon} />
              </TouchableOpacity>
            </View>
            {showVideo ? (
              <Video
                ref={video}
                style={styles.image}
                source={data ? { uri: data.video } : null}
                useNativeControls
                shouldPlay={true}
                resizeMode={ResizeMode.COVER}
                onPlaybackStatusUpdate={(status) => setStatus(() => status)}
              />
            ) : (
              <Image
                source={
                  data?.thumbnail
                    ? { uri: data?.thumbnail }
                    : require('../../assets/images/bicep.jpg')
                }
                style={styles.image}
              />
            )}
          </View>
          <Animated.View
            style={[styles.textContainer, { transform: [{ translateY }] }]}>
            <Text style={styles.title}>{data?.name}</Text>

            <TouchableOpacity
              style={styles.startButton}
              onPress={onStartWorkout}>
              <Text style={styles.startButtonText}>Start Workout</Text>
              <Ionicons name="play" size={24} />
            </TouchableOpacity>

            <View style={styles.row}>
              <View style={styles.row}>
                <Ionicons name="repeat-outline" size={24} color="#ccc" />
                <Text style={styles.tag}> 3-4 sets</Text>
              </View>
              <View style={styles.row}>
                <Ionicons name="barbell-outline" size={24} color="#ccc" />
                <Text style={styles.tag}> 8-12 reps</Text>
              </View>
            </View>

            <View style={styles.descContainer}>
              <Text style={styles.description}>{data?.description}</Text>
            </View>

            <View style={styles.separator} />

            <View style={styles.tagContainer}>
              <Text style={styles.tag}>Tags: </Text>
              {data?.tags?.map((tag, index) => (
                <View style={styles.tagBG} key={index}>
                  <Text style={styles.tag}>{tag}</Text>
                </View>
              ))}
            </View>

            {/* <View style={styles.separator} />
            <Text style={styles.title}>Similar Exercises</Text>
            <View style={styles.separator} />
            <Text style={styles.title}>Comments</Text>
            <View style={styles.separator} /> */}

            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
              <Text style={styles.tag}> Made with love by brofit</Text>
              <Ionicons name="heart" size={24} color="red" />
            </View>
          </Animated.View>
        </View>
      </ScrollView>
    </GradientBG>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scroll: {
    flex: 1,
    paddingTop: 10,
  },
  iconContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 30,
    marginBottom: 10,
  },
  icon: {
    margin: 5,
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 100,
    backgroundColor: '#ccc',
    color: 'black',
  },
  thumbnailContainer: {
    backgroundColor: '#1a1b19',
    width: '100%',
    borderRadius: 20,
    padding: 10,
  },
  image: {
    width: '100%',
    height: 300,
    borderRadius: 20,
  },
  textContainer: {
    padding: 10,
    borderRadius: 20,
    marginTop: 10,
    elevation: 1,
    backgroundColor: 'black',
    height: '100%',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'white',
    textAlign: 'center',
  },
  startButton: {
    backgroundColor: neon,
    borderRadius: 10,
    paddingVertical: 12,
    marginBottom: 20,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 10,
  },
  startButtonText: {
    color: 'black',
    fontSize: 18,
    fontWeight: 'bold',
  },
  descContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    backgroundColor: '#1a1b19',
    borderRadius: 20,
    padding: 20,
    marginTop: 20,
  },
  description: {
    fontSize: 18,
    color: 'white',
    marginBottom: 20,
  },
  separator: {
    height: 1,
    backgroundColor: '#ccc',
    marginBottom: 20,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    gap: 10,
  },
  tagContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
    flexWrap: 'wrap',
    marginBottom: 20,
    backgroundColor: '#1a1b19',
    borderRadius: 20,
    padding: 20,
  },
  tagBG: {
    backgroundColor: bgGlassLight,
    borderRadius: 10,
    paddingHorizontal: 7,
    paddingVertical: 5,
  },
  tag: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#eeee',
  },
});

export default ExerciseScreen;
