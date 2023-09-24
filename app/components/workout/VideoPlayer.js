import React, { Children } from 'react';
import { View, StyleSheet } from 'react-native';
import { Video, ResizeMode } from 'expo-av';
import { LinearGradient } from 'expo-linear-gradient';

const VideoPlayer = ({ image, children }) => {
  const video = React.useRef(null);
  const [status, setStatus] = React.useState({});

  return (
    <View style={styles.card}>
      {children}
      <Video
        ref={video}
        style={styles.video}
        source={image ? image : null}
        useNativeControls
        resizeMode={ResizeMode.COVER}
        isLooping
        onPlaybackStatusUpdate={(status) => setStatus(() => status)}>
        <LinearGradient
          colors={['transparent', 'rgba(0,0,0,0.8)']}
          style={styles.linearGradient}></LinearGradient>
      </Video>
    </View>
  );
};

const styles = StyleSheet.create({
  video: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  card: {
    height: 250,
    marginHorizontal: 10,
    borderRadius: 25,
    overflow: 'hidden',
    marginBottom: 10,
  },
  linearGradient: {
    flex: 1,
    justifyContent: 'flex-end',
    padding: 10,
  },
});

export default VideoPlayer;
