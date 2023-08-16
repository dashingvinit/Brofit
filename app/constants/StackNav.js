// import { createStackNavigator } from '@react-navigation/stack';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Welcome from '../Welcome';
import Signup from '../Signup';
import ProfileSetup from '../ProfileSetup';
import Login from '../Login';
import OwnerLogin from '../owner/OwnerLogin';
import AdminLogin from '../admin/AdminLogin';
import Home from '../Home';
import OwnerHome from '../owner/Home';
import AdminPage from '../admin/Adminpage';
import Forgetpassword from '../Forgetpassword';
import ConfirmPass from '../ConfirmPassword';

const Stack = createNativeStackNavigator();

const StackNav = ({ sethandleLogin }) => {
  try {
    return (
      <Stack.Navigator
        initialRouteName="Welcome"
        screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Welcome" component={Welcome} />
        <Stack.Screen name="Signup" component={Signup} />
        <Stack.Screen name="ProfileSetup">
          {(props) => (
            <ProfileSetup {...props} sethandleLogin={sethandleLogin} />
          )}
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
        {/* Rest Password Screens */}
        <Stack.Screen name="Forgetpassword" component={Forgetpassword} />
        <Stack.Screen name="ConfirmPass" component={ConfirmPass} />
        {/*added for Users home */}
        <Stack.Screen name="Home1" component={Home} />
        {/*added for Owners home */}
        <Stack.Screen name="Home2" component={OwnerHome} />
        {/*added for Admins home */}
        <Stack.Screen name="Home3" component={AdminPage} />
      </Stack.Navigator>
    );
  } catch (error) {
    console.log('Error in stack screen:', error);
  }
};

export default StackNav;
