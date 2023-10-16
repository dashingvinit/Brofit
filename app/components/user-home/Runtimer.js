import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import React, { useState, useEffect } from 'react';
import { bgGlass, bgGlassLight, neon } from '../../constants/Constants';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const Runtimer = () => {
  const initialTimer = 600; // 10 minutes in seconds (10 * 60 = 600)
  const [timer, setTimer] = useState(initialTimer);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    let interval = null;
    if (isActive) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    } else if (!isActive && timer !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive, timer]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds
      .toString()
      .padStart(2, '0')}`;
  };

  const handleStartPause = () => {
    setIsActive((prevIsActive) => !prevIsActive);
  };

  const handleReset = () => {
    setIsActive(false);
    setTimer(initialTimer);
  };

  return (
    <>
      <View style={styles.timerContainer}>
        <View style={styles.iconContainer}>
          <FontAwesome5 name="running" size={30} color="white" />
        </View>
        <View>
          <Text style={styles.header}>WarmUp Run</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={styles.runStats}>{formatTime(timer)}</Text>
            <Text style={styles.runStats}> • 6.0 m/hr</Text>
            <Text style={styles.runStats}> • 744 cals</Text>
          </View>
        </View>
        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={handleStartPause}>
          <Text style={styles.buttonText}>{isActive ? 'Pause' : 'Start'}</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.resetButton} onPress={handleReset}>
        <Text style={styles.buttonText}>Reset</Text>
      </TouchableOpacity>
    </>
  );
};

const styles = StyleSheet.create({
  timerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: bgGlass,
    borderTopEndRadius: 20,
    borderTopStartRadius: 20,
    marginTop: 10,
    padding: 10,
    marginHorizontal: 5,
  },
  iconContainer: {
    backgroundColor: bgGlassLight,
    borderRadius: 100,
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginRight: 5,
  },
  header: { color: 'white', fontSize: 20 },
  runStats: {
    color: '#D8D8D8',
    fontSize: 12,
    fontWeight: 'bold',
    marginRight: 5,
  },
  bullet: {
    fontSize: 24,
    color: 'white',
    fontWeight: 'bold',
  },
  buttonContainer: {
    marginLeft: 'auto',
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 10,
    backgroundColor: neon,
  },
  buttonText: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 20,
  },
  resetButton: {
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomEndRadius: 20,
    borderBottomStartRadius: 20,
    paddingVertical: 2,
    marginHorizontal: 5,
    marginBottom: 8,
    backgroundColor: neon,
  },
});

export default Runtimer;
