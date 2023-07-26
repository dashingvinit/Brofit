import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import LottieView from 'lottie-react-native';
import Background from './components/Background';
import Btn from './components/Btn';
import { bgColor, bgGlassLight, neon } from './constants/Constants';

const Home = (props) => {
  return (
    <Background>
      <View style={styles.container}>
        <View style={styles.iconContainer}>
          <Text style={{ color: neon, fontSize: 38 }}>Brofit</Text>
        </View>

        <View style={styles.bottomContainer}>
          <LottieView
            source={require('./assets/lottieFiles/limeAnimations.json')}
            autoPlay
            loop
            style={{
              alignItems: 'flex-end',
            }}
          />

          <Text style={{ color: neon, fontSize: 32 }}>
            Unleash Your Inner Strength
          </Text>

          <Text style={styles.bottomText}>
            - Achieve Your Fitness Goals
            {'\n'}- Track Your Progress
            {'\n'}- Personalized Training Programs
          </Text>

          <Btn
            bgColor={neon}
            textColor={bgColor}
            btnLabel="Lets Go >>>"
            Press={() => props.navigation.navigate('Login')}
          />
          <Btn
            bgColor={bgColor}
            textColor={neon}
            btnLabel="Profile"
            Press={() => props.navigation.navigate('ProfileSetup')}
          />

          <View style={styles.redirect}>
            <Text style={styles.redirectMsg}>New to Brofit?</Text>
            <TouchableOpacity
              onPress={() => props.navigation.navigate('Signup')}>
              <Text style={styles.signup}>SignUp</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Background>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 30,
    paddingVertical: 20,
  },
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomContainer: {
    justifyContent: 'center',
    marginHorizontal: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    width: '100%',
    // backgroundColor: 'black',
    // borderWidth: 2,
    // borderColor: 'white',
  },
  bottomText: {
    color: '#F7FFE5',
    textShadowColor: '#27374D', // Border color
    textShadowOffset: { width: 1, height: 1 }, // Offset of the shadow
    textShadowRadius: 3, // Radius of the shadow
    fontSize: 18,
    lineHeight: 30,
    marginVertical: 10,
  },
  redirect: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  redirectMsg: {
    color: '#ffffff99',
    fontSize: 12,
    marginRight: 5,
  },
  signup: {
    color: 'white',
    fontSize: 14,
  },
});

export default Home;
