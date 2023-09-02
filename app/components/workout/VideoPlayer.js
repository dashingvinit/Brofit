import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  Button,
} from 'react-native';
import { Video, ResizeMode } from 'expo-av';
import { bgGlassLight } from '../../constants/Constants';
import Ionicons from 'react-native-vector-icons/Ionicons';

const VideoPlayer = () => {
  const video = React.useRef(null);
  const [status, setStatus] = React.useState({});
  return (
    <View style={styles.card}>
      <ImageBackground
        source={require('../../assets/images/tenor.gif')} // Use the directly constructed image source
        style={styles.imageBackground}
        resizeMode="cover">
        <Text
          style={{
            color: 'white',
            fontSize: 18,
            fontWeight: 'bold',
            margin: 10,
          }}>
          Chest Press
        </Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={() => {}}>
            <View style={styles.row}>
              <Text
                style={{
                  color: 'white',
                  fontSize: 18,
                  fontWeight: 'bold',
                }}>
                Next
              </Text>
              <Ionicons
                name="ios-arrow-forward-circle-outline"
                size={30}
                color="white"
              />
            </View>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    height: 250,
    marginHorizontal: 10,
    borderRadius: 25,
    overflow: 'hidden',
    marginBottom: 10,
  },
  imageBackground: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
    alignItems: 'center',
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    alignItems: 'center',
    marginBottom: 10,
  },
  button: {
    backgroundColor: bgGlassLight,
    borderRadius: 25,
    padding: 10,
  },
});

export default VideoPlayer;

{
  /* <View style={styles.container}>
      <Video
        ref={video}
        style={styles.video}
        source={{
          uri: 'https://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
        }}
        useNativeControls
        resizeMode={ResizeMode.CONTAIN}
        isLooping
        onPlaybackStatusUpdate={(status) => setStatus(() => status)}
      />
      <View style={styles.buttons}>
        <Button
          title={status.isPlaying ? 'Pause' : 'Play'}
          onPress={() =>
            status.isPlaying
              ? video.current.pauseAsync()
              : video.current.playAsync()
          }
        />
      </View>
    </View> */
}

// const styles = StyleSheet.create({
//   container: {
//     justifyContent: 'center',
//     marginHorizontal: 10,
//     borderRadius: 20,
//   },
//   video: {
//     height: 250,
//     width: '100%',
//   },
//   buttons: {
//     position: 'absolute',
//     bottom: 0,
//     left: 0,
//     right: 0,
//     alignItems: 'center',
//     justifyContent: 'space-around',
//   },
// });
