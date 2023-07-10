import * as React from 'react';
import { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import BottomNav from './src/constants/BottomNav';
import StackNav from './src/constants/StackNav';

// import styles from './src/components/home/popular/popularjobs.style'

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  return (
    <NavigationContainer>
      {isLoggedIn ? <BottomNav /> : <StackNav />}
    </NavigationContainer>
  );
}

export default App;
