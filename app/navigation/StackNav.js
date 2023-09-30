// import { createStackNavigator } from '@react-navigation/stack';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Welcome from '../ui-welcom/Welcome';
import Login from '../ui-welcom/Login';
import Signup from '../ui-welcom/Signup';
import Forgetpassword from '../ui-welcom/Forgetpassword';
import ConfirmPass from '../ui-welcom/ConfirmPassword';
import ProfileSetup from '../ui-welcom/ProfileSetup';

import AdminLogin from '../ui-admin/AdminLogin';
import Home from '../ui-user/Home';
import OwnerHome from '../ui-owner/Home';
import AdminPage from '../ui-admin/Adminpage';

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
