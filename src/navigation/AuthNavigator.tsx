import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Header from '../components/Header';
import Login from '../screens/ProtectedRoute';

const { Navigator, Screen } = createStackNavigator();

/**
 * TODO: the current Login component is actually the protected auth route.
 * If the user is not logged in, they'll see the auth screen.
 * If they are logged in, they shouldn't.
 */

const LoginNavigator = () => (
  <Navigator
    initialRouteName="Login"
    headerMode={'screen'}
    screenOptions={{
      animationTypeForReplace: 'push',
      header: (props) => {
        return <Header {...props} />;
      },
    }}
  >
    <Screen name="Login" component={Login} options={() => ({ title: 'Login' })} />
  </Navigator>
);

export default LoginNavigator;
