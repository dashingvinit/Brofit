import React, { Children } from 'react';
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
import { LinearGradient } from 'expo-linear-gradient';

const VideoPlayer = ({ image, children }) => {
  const video = React.useRef(null);
  const [status, setStatus] = React.useState({});

  return (
    <View style={styles.card}>
      <ImageBackground
        source={image ? image : null}
        style={styles.imageBackground}
        resizeMode="cover">
        <LinearGradient
          colors={['transparent', 'rgba(0,0,0,0.8)']}
          style={styles.linearGradient}>
          {children}
        </LinearGradient>
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
  linearGradient: {
    flex: 1,
    justifyContent: 'flex-end',
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
