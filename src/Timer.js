import React, { useState, useRef } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import { COLORS, SIZES } from './constants';
import moment from 'moment';
import { neon } from './constants/Constants';

function Timer({ interval, style }) {
  const pad = (n) => (n < 10 ? '0' + n : n);
  const duration = moment.duration(interval);
  const centiseconds = Math.floor(duration.milliseconds() / 10);
  return (
    <View style={styles.timerContainer}>
      <Text style={style}>{pad(duration.minutes())}:</Text>
      <Text style={style}>{pad(duration.seconds())}:</Text>
      <Text style={style}>{pad(centiseconds)}</Text>
    </View>
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
      <View style={{ height: 450 }}>
        <ScrollView>
          {laps.map((lap, index) => (
            <Lap
              number={laps.length - index}
              key={laps.length - index}
              interval={index === 0 ? timer + lap : lap}
              fastest={lap === min}
              slowest={lap === max}
            />
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
      source={require('./assets/grade1.jpg')}
      style={styles.backgroundImage}>
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
                color="#e6fd54"
                background="#1d2226b3"
                disabled
              />
              <RoundButton
                title="Start"
                color="#e6fd54"
                background="#1d2226b3"
                onPress={startTimer}
              />
            </ButtonsRow>
          )}
          {start > 0 && (
            <ButtonsRow>
              <RoundButton
                title="Lap"
                color="#e6fd54"
                background="#1d2226"
                onPress={lap}
              />
              <RoundButton
                title="Stop"
                color="#e6fd54"
                background="#1d2226"
                onPress={stopTimer}
              />
            </ButtonsRow>
          )}
          {laps.length > 0 && start === 0 && (
            <ButtonsRow>
              <RoundButton
                title="Reset"
                color="#e6fd54"
                background="#1d2226"
                onPress={reset}
              />
              <RoundButton
                title="Start"
                color="#e6fd54"
                background="#1d2226"
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
    paddingTop: 150,
    paddingHorizontal: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  container1: {
    alignItems: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    height: '100%',
  },
  timer: {
    color: COLORS.lightWhite,
    fontSize: 66,
    fontWeight: '200',
    alignSelf: 'stretch',
    alignItems: 'center',
  },
  button: {
    alignSelf: 'stretch',
    alignItems: 'center',
    width: 150,
    height: 76,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 30,
    marginTop: -150,
  },
  buttonTitle: {
    fontSize: 30,
  },
  buttonBorder: {
    width: 150,
    height: 76,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonsRow: {
    flexDirection: 'row',
    alignSelf: 'stretch',
    justifyContent: 'space-between',
    marginTop: 80,
    marginBottom: 30,
  },
  lapText: {
    marginTop: 20,
    color: neon,
    fontSize: 18,
  },
  lapTimer: {
    width: 30,
  },
  lap: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
  },
  scrollView: {
    alignSelf: 'stretch',
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
