import React, { useState, useRef } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';

import moment from 'moment';
import { bgColor, bgGlassLight, neon } from '../constants/Constants';
import { Hr, TopBack } from '../components';
import LottieView from 'lottie-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

function Timer({ interval, style }) {
  const pad = (n) => (n < 10 ? '0' + n : n);
  const duration = moment.duration(interval);
  const centiseconds = Math.floor(duration.milliseconds() / 10);
  return (
    <>
      <View style={styles.timerContainer}>
        <Text style={style}>{pad(duration.minutes())}:</Text>
        <Text style={style}>{pad(duration.seconds())}:</Text>
        <Text style={style}>{pad(centiseconds)}</Text>
      </View>
    </>
  );
}

function RoundButton({ title, color, background, onPress, disabled }) {
  return (
    <TouchableOpacity
      onPress={() => !disabled && onPress()}
      style={[styles.button, { backgroundColor: background }]}
      activeOpacity={disabled ? 1.0 : 0.7}>
      <View style={styles.buttonBorder}>
        <Text style={[styles.buttonTitle, { color }]}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
}

function Lap({ number, interval, fastest, slowest }) {
  const lapStyle = [
    styles.lapText,
    fastest && styles.fastest,
    slowest && styles.slowest,
  ];
  return (
    <View style={styles.lap}>
      <Text style={lapStyle}>Lap {number}</Text>
      <Timer style={[lapStyle, styles.lapTimer]} interval={interval} />
    </View>
  );
}

function LapsTable({ laps, timer }) {
  const finishedLaps = laps.slice(1);
  let min = Number.MAX_SAFE_INTEGER;
  let max = Number.MIN_SAFE_INTEGER;
  if (finishedLaps.length >= 2) {
    finishedLaps.forEach((lap) => {
      if (lap < min) min = lap;
      if (lap > max) max = lap;
    });
  }
  return (
    <ScrollView style={styles.scrollView}>
      <View>
        <ScrollView>
          {laps.map((lap, index) => (
            <View key={index}>
              <Lap
                number={laps.length - index}
                key={laps.length - index}
                interval={index === 0 ? timer + lap : lap}
                fastest={lap === min}
                slowest={lap === max}
              />
              <Hr />
            </View>
          ))}
        </ScrollView>
      </View>
    </ScrollView>
  );
}

function ButtonsRow({ children }) {
  return <View style={styles.buttonsRow}>{children}</View>;
}

export default function App() {
  const [start, setStart] = useState(0);
  const [now, setNow] = useState(0);
  const [laps, setLaps] = useState([]);
  const [isRunning, setIsRunning] = useState(false);
  const timerRef = useRef(null);

  const startTimer = () => {
    setStart((prevStart) => (isRunning ? prevStart : new Date().getTime()));
    setNow(new Date().getTime());
    setLaps((prevLaps) => (isRunning ? prevLaps : [0]));
    setIsRunning(true);
    timerRef.current = requestAnimationFrame(updateTimer);
  };

  const stopTimer = () => {
    if (timerRef.current) {
      cancelAnimationFrame(timerRef.current);
      timerRef.current = null;
    }
    const [firstLap, ...other] = laps;
    setLaps([firstLap + now - start, ...other]);
    setStart(0);
    setNow(0);
    setIsRunning(false);
  };

  const updateTimer = () => {
    setNow(new Date().getTime());
    timerRef.current = requestAnimationFrame(updateTimer);
  };

  const lap = () => {
    const timestamp = new Date().getTime();
    const [firstLap, ...other] = laps;
    setLaps([0, firstLap + now - start, ...other]);
    setStart(timestamp);
    setNow(timestamp);
  };

  const reset = () => {
    setLaps([]);
    setStart(0);
    setNow(0);
    setIsRunning(false);
  };

  return (
    <ImageBackground
      source={require('../assets/grade5.png')}
      style={styles.backgroundImage}>
      <SafeAreaView />
      <View style={{ zIndex: 2 }}>
        <TopBack>Timer</TopBack>
      </View>

      <LottieView
        source={require('../assets/lottieFiles/circlePulse.json')}
        autoPlay
        loop
        style={{ height: '100%', position: 'absolute' }}
      />
      <View style={styles.container}>
        <Timer
          interval={laps.reduce((total, curr) => total + curr, 0) + now - start}
          style={styles.timer}
        />
        <LapsTable laps={laps} timer={now - start} />
        <View style={styles.container1}>
          {laps.length === 0 && (
            <ButtonsRow>
              <RoundButton
                title="Lap"
                color={bgGlassLight}
                background={bgGlassLight}
                disabled
              />
              <RoundButton
                title="Start"
                color={neon}
                background={bgGlassLight}
                onPress={startTimer}
              />
            </ButtonsRow>
          )}
          {start > 0 && (
            <ButtonsRow>
              <RoundButton
                title="Lap"
                color={neon}
                background={bgGlassLight}
                onPress={lap}
              />
              <RoundButton
                title="Stop"
                color="white"
                background={bgGlassLight}
                onPress={stopTimer}
              />
            </ButtonsRow>
          )}
          {laps.length > 0 && start === 0 && (
            <ButtonsRow>
              <RoundButton
                title="Reset"
                color="white"
                background={bgGlassLight}
                onPress={reset}
              />
              <RoundButton
                title="Start"
                color={neon}
                background={bgColor}
                onPress={startTimer}
              />
            </ButtonsRow>
          )}
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    height: '100%',
  },
  timer: {
    color: 'white',
    fontSize: 66,
    fontWeight: '200',
    alignSelf: 'stretch',
    alignItems: 'center',
  },
  container1: {
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'black',
    borderTopRightRadius: 45,
    borderTopLeftRadius: 45,
    width: '100%',
  },
  button: {
    alignSelf: 'stretch',
    alignItems: 'center',
    marginHorizontal: 10,
    paddingHorizontal: 10,
    paddingVertical: 7,
    borderRadius: 40,
  },
  buttonTitle: {
    fontSize: 28,
    color: 'white',
  },
  buttonBorder: {
    width: 120,
    height: 60,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonsRow: {
    flexDirection: 'row',
    alignSelf: 'stretch',
    justifyContent: 'center',
    marginBottom: 100,
    marginTop: 40,
  },
  lap: {
    flexDirection: 'row',
    // justifyContent: 'flex-start',
    marginTop: 10,
    marginLeft: 20,
    paddingVertical: 10,
  },
  lapText: {
    color: 'white',
    fontSize: 18,
  },
  lapTimer: {
    width: 30,
  },
  scrollView: {
    alignSelf: 'stretch',
    marginHorizontal: 20,
  },
  fastest: {
    color: '#4BC05F',
  },
  slowest: {
    color: '#CC3531',
  },
  timerContainer: {
    flexDirection: 'row',
    paddingHorizontal: 30,
  },
});
