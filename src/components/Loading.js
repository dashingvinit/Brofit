import react from 'react';
import LottieView from 'lottie-react-native';

export default function App() {
  return (
    <LottieView
      source={require('../assets/lottieFiles/timer.json')}
      autoPlay
      loop
    />
  );
}
