import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { ImageBackground } from 'react-native';
import { COLORS, icons, images, SIZES } from './constants';
import moment from 'moment';
import { bgColor, bgLight, neon } from './constants/Constants';

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
export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      start: 0,
      now: 0,
      laps: [],
    };
  }
  componentWillUnmount() {
    clearInterval(this.timer);
  }

  start = () => {
    const now = new Date().getTime();
    this.setState({
      start: now,
      now,
      laps: [0],
    });
    this.timer = setInterval(() => {
      this.setState({ now: new Date().getTime() });
    }, 100);
  };

  lap = () => {
    const timestamp = new Date().getTime();
    const { laps, now, start } = this.state;
    const [firstLap, ...other] = laps;
    this.setState({
      laps: [0, firstLap + now - start, ...other],
      start: timestamp,
      now: timestamp,
    });
  };

  stop = () => {
    clearInterval(this.timer);
    const { laps, now, start } = this.state;
    const [firstLap, ...other] = laps;
    this.setState({
      laps: [firstLap + now - start, ...other],
      start: 0,
      now: 0,
    });
  };
  reset = () => {
    this.setState({
      laps: [],
      start: 0,
      now: 0,
    });
  };
  resume = () => {
    const now = new Date().getTime();
    this.setState({
      start: now,
      now,
    });
    this.timer = setInterval(() => {
      this.setState({ now: new Date().getTime() });
    }, 100);
  };
  render() {
    const { now, start, laps } = this.state;
    const timer = now - start;
    return (
      <ImageBackground
        source={require('./assets/grade1.jpg')}
        style={styles.backgroundImage}>
        <View style={styles.container}>
          <Timer
            interval={laps.reduce((total, curr) => total + curr, 0) + timer}
            style={styles.timer}
          />
          <LapsTable laps={laps} timer={timer} />
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
                  onPress={this.start}
                />
              </ButtonsRow>
            )}
            {start > 0 && (
              <ButtonsRow>
                <RoundButton
                  title="Lap"
                  color="#e6fd54"
                  background="#1d2226"
                  onPress={this.lap}
                />
                <RoundButton
                  title="Stop"
                  color="#e6fd54"
                  background="#1d2226"
                  onPress={this.stop}
                />
              </ButtonsRow>
            )}
            {laps.length > 0 && start === 0 && (
              <ButtonsRow>
                <RoundButton
                  title="Reset"
                  color="#e6fd54"
                  background="#1d2226"
                  onPress={this.reset}
                />
                <RoundButton
                  title="Start"
                  color="#e6fd54"
                  background="#1d2226"
                  onPress={this.resume}
                />
              </ButtonsRow>
            )}
          </View>
        </View>
      </ImageBackground>
    );
  }
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
