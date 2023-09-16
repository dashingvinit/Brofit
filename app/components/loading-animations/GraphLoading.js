import react from 'react';
import LottieView from 'lottie-react-native';

export default function App() {
  return (
    <LottieView
      source={require('../../assets/lottieFiles/graphLoading.json')}
      autoPlay
      loop
      style={{ height: 200, alignContent: 'center', alignSelf: 'center' }}
    />
  );
}
