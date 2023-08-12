import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Dimensions,
} from 'react-native';
import { WebView } from 'react-native-webview';

const VideoPage = () => {
  const [expandedSection, setExpandedSection] = useState(null);

  const toggleCollapse = (section) => {
    if (expandedSection === section) {
      setExpandedSection(null);
    } else {
      setExpandedSection(section);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Video Page</Text>

      <TouchableOpacity
        onPress={() => toggleCollapse('chest')}
        style={styles.sectionHeader}>
        <Text style={styles.sectionHeaderText}>Chest</Text>
        <Text
          style={
            expandedSection === 'chest'
              ? styles.collapseIcon
              : styles.expandIcon
          }>
          {expandedSection === 'chest' ? '^' : '>'}
        </Text>
      </TouchableOpacity>
      <ScrollView
        style={
          expandedSection === 'chest' ? styles.videoContainer : styles.collapsed
        }>
        {expandedSection === 'chest' && (
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

      <TouchableOpacity
        onPress={() => toggleCollapse('back')}
        style={styles.sectionHeader}>
        <Text style={styles.sectionHeaderText}>Back</Text>
        <Text
          style={
            expandedSection === 'back' ? styles.collapseIcon : styles.expandIcon
          }>
          {expandedSection === 'back' ? '^' : '>'}
        </Text>
      </TouchableOpacity>
      <ScrollView
        style={
          expandedSection === 'back' ? styles.videoContainer : styles.collapsed
        }>
        {expandedSection === 'back' && (
          <View>
            <Text style={styles.videoTitle}>Video 1</Text>
            <WebView
              source={{ uri: 'https://www.youtube.com/embed/VIDEO_ID' }}
              style={styles.video}
            />
            {/* Add more videos as needed */}
          </View>
        )}
      </ScrollView>

      <TouchableOpacity
        onPress={() => toggleCollapse('biceps')}
        style={styles.sectionHeader}>
        <Text style={styles.sectionHeaderText}>Biceps</Text>
        <Text
          style={
            expandedSection === 'biceps'
              ? styles.collapseIcon
              : styles.expandIcon
          }>
          {expandedSection === 'biceps' ? '^' : '>'}
        </Text>
      </TouchableOpacity>
      <ScrollView
        style={
          expandedSection === 'biceps'
            ? styles.videoContainer
            : styles.collapsed
        }>
        {expandedSection === 'biceps' && (
          <View>
            <Text style={styles.videoTitle}>Video 1</Text>
            <WebView
              source={{ uri: 'https://www.youtube.com/embed/VIDEO_ID' }}
              style={styles.video}
            />
            {/* Add more videos as needed */}
          </View>
        )}
      </ScrollView>

      <TouchableOpacity
        onPress={() => toggleCollapse('triceps')}
        style={styles.sectionHeader}>
        <Text style={styles.sectionHeaderText}>Triceps</Text>
        <Text
          style={
            expandedSection === 'triceps'
              ? styles.collapseIcon
              : styles.expandIcon
          }>
          {expandedSection === 'triceps' ? '^' : '>'}
        </Text>
      </TouchableOpacity>
      <ScrollView
        style={
          expandedSection === 'triceps'
            ? styles.videoContainer
            : styles.collapsed
        }>
        {expandedSection === 'triceps' && (
          <View>
            <Text style={styles.videoTitle}>Video 1</Text>
            <WebView
              source={{ uri: 'https://www.youtube.com/embed/VIDEO_ID' }}
              style={styles.video}
            />
            {/* Add more videos as needed */}
          </View>
        )}
      </ScrollView>

      <TouchableOpacity
        onPress={() => toggleCollapse('leg')}
        style={styles.sectionHeader}>
        <Text style={styles.sectionHeaderText}>Leg</Text>
        <Text
          style={
            expandedSection === 'leg' ? styles.collapseIcon : styles.expandIcon
          }>
          {expandedSection === 'leg' ? '^' : '>'}
        </Text>
      </TouchableOpacity>
      <ScrollView
        style={
          expandedSection === 'leg' ? styles.videoContainer : styles.collapsed
        }>
        {expandedSection === 'leg' && (
          <View>
            <Text style={styles.videoTitle}>Video 1</Text>
            <WebView
              source={{ uri: 'https://www.youtube.com/embed/VIDEO_ID' }}
              style={styles.video}
            />
            {/* Add more videos as needed */}
          </View>
        )}
      </ScrollView>

      <TouchableOpacity
        onPress={() => toggleCollapse('shoulder')}
        style={styles.sectionHeader}>
        <Text style={styles.sectionHeaderText}>Shoulder</Text>
        <Text
          style={
            expandedSection === 'shoulder'
              ? styles.collapseIcon
              : styles.expandIcon
          }>
          {expandedSection === 'shoulder' ? '^' : '>'}
        </Text>
      </TouchableOpacity>
      <ScrollView
        style={
          expandedSection === 'shoulder'
            ? styles.videoContainer
            : styles.collapsed
        }>
        {expandedSection === 'shoulder' && (
          <View>
            <Text style={styles.videoTitle}>Video 1</Text>
            <WebView
              source={{ uri: 'https://www.youtube.com/embed/VIDEO_ID' }}
              style={styles.video}
            />
            {/* Add more videos as needed */}
          </View>
        )}
      </ScrollView>
    </View>
  );
};

const { height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
    paddingLeft: 20,
    backgroundColor: 'black',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: 'white',
  },
  collapsed: {
    maxHeight: 0,
    overflow: 'hidden',
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
    color: 'white',
  },
  expandIcon: {
    fontSize: 18,
    transform: [{ rotate: '90deg' }],
    color: '#e6fd54',
  },
  collapseIcon: {
    fontSize: 18,
    color: '#e6fd54',
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
