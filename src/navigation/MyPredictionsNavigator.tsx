import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Header from '../components/Header';
import MyPredictions from '../screens/MyPredictions';

const { Navigator, Screen } = createStackNavigator();

/**
 * TODO: the current Login component is actually the protected auth route.
 * If the user is not logged in, they'll see the auth screen.
 * If they are logged in, they shouldn't.
 */

const MyPredictionsNavigator = () => (
  <Navigator
    initialRouteName="Auth"
    headerMode={'screen'}
    screenOptions={{
      animationTypeForReplace: 'push',
      header: (props) => {
        return <Header {...props} />;
      },
    }}
  >
    <Screen
      name="MyPredictions"
      component={MyPredictions}
      options={() => ({ title: 'My Predictions' })}
    />
  </Navigator>
);

export default MyPredictionsNavigator;
