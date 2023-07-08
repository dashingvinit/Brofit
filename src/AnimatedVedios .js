import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { WebView } from 'react-native-webview';

const VideoPage = () => {
  const [isCollapsed, setIsCollapsed] = useState(true);

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    
    <View style={styles.container}>
      <Text style={styles.heading}>Video Page</Text>
      <View style={isCollapsed ? styles.collapsed : styles.expanded}>
        <TouchableOpacity onPress={toggleCollapse} style={styles.sectionHeader}>
          <Text style={styles.sectionHeaderText}>Chest</Text>
          <Text style={isCollapsed ? styles.expandIcon : styles.collapseIcon}>
            {isCollapsed ? '>' : '^'}
          </Text>
        </TouchableOpacity>
        <ScrollView style={styles.videoContainer}>
          {isCollapsed ? null : (
            <View>
              <Text style={styles.videoTitle}>Video 1</Text>
              <WebView
                source={{ uri: 'https://www.youtube.com/embed/P3hfpjGErdA' }}
                style={styles.video}
              />
              {/* Add more videos as needed */}
            </View>
          )}
        </ScrollView>
      </View>
    </View>
  );
};

const { height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop:60,
    paddingLeft:20,
    backgroundColor:'black',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color:'white',
  },
  collapsed: {
    overflow: 'hidden',
  },
  expanded: {
    overflow: 'visible',
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    paddingVertical: 8,
    paddingHorizontal: 20,
    backgroundColor: '#2a2f37',
  },
  sectionHeaderText: {
    flex: 1,
    fontSize: 18,
    color:'white',
  },
  expandIcon: {
    fontSize: 18,
    transform: [{ rotate: '90deg' }],
    color:'#e6fd54',
  },
  collapseIcon: {
    fontSize: 18,
    color:'#e6fd54',
  },
  videoContainer: {
    marginBottom: 16,
    maxHeight: height - 240,
  },
  videoTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  video: {
    width: '100%',
    aspectRatio: 16 / 9,
  },
});

export default VideoPage;
