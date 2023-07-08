import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Welcome from './src/Welcome';
import Signup from './src/Signup';
import ProfileSetup from './src/ProfileSetup';
import Login from './src/Login';
import OwnerLogin from './src/OwnerLogin';
import Home from './src/Home';
import MainContainer from './src/screens/MainContainer';
import AnimatedVedios from './src/AnimatedVedios '
// import styles from './src/components/home/popular/popularjobs.style'


const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Welcome" component={Welcome} />
        <Stack.Screen name="Signup" component={Signup} />
        <Stack.Screen name="ProfileSetup" component={ProfileSetup} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="OwnerLogin" component={OwnerLogin} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="AnimatedVedios" component={AnimatedVedios} />

        {/* <Stack.Screen name="MainContainer" component={MainContainer} /> */}

      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
