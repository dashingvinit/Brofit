import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Welcome from '../Welcome';
import Signup from '../Signup';
import ProfileSetup from '../ProfileSetup';
import Login from '../Login';
import OwnerLogin from '../owner/OwnerLogin';
import AdminLogin from '../admin/AdminLogin';
import Home from '../Home';
import AnimatedVedios from '../AnimatedVedios ';
import Attendance from '../Attendance';
import Timer from '../Timer';
import OwnerHome from '../owner/Home';
import Members from '../owner/Members';
import AdminPage from '../admin/Adminpage';
import Userrole from '../admin/Userrole';
import Plans from '../owner/Plans';

const Stack = createNativeStackNavigator();

const StackNav = ({ sethandleLogin }) => {
  return (
    <Stack.Navigator
      initialRouteName="Welcome"
      screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Welcome" component={Welcome} />
      <Stack.Screen name="Signup" component={Signup} />
      <Stack.Screen name="ProfileSetup">
        {(props) => <ProfileSetup {...props} sethandleLogin={sethandleLogin} />}
      </Stack.Screen>
      <Stack.Screen name="Login">
        {(props) => <Login {...props} sethandleLogin={sethandleLogin} />}
      </Stack.Screen>
      <Stack.Screen name="OwnerLogin">
        {(props) => <OwnerLogin {...props} sethandleLogin={sethandleLogin} />}
      </Stack.Screen>
      <Stack.Screen name="AdminLogin">
        {(props) => <AdminLogin {...props} sethandleLogin={sethandleLogin} />}
      </Stack.Screen>
      <Stack.Screen name="Home1" component={Home} />
      <Stack.Screen name="AnimatedVideos" component={AnimatedVedios} />
      <Stack.Screen name="Attendance" component={Attendance} />
      <Stack.Screen name="Timer" component={Timer} />

      {/*added for Owners */}

      <Stack.Screen name="Home2" component={OwnerHome} />
      <Stack.Screen name="Members" component={Members} />
      <Stack.Screen name="Plans" component={Plans} />

      {/*added for Admins */}

      <Stack.Screen name="Adminpage" component={AdminPage} />
      <Stack.Screen name="Userrole" component={Userrole} />
    </Stack.Navigator>
  );
};

export default StackNav;
