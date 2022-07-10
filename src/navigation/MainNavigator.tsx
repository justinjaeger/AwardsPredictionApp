import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Home from '../screens/Main/Home';
import Header from '../components/Header';

const { Navigator, Screen } = createStackNavigator();

const MainNavigator = () => (
  <Navigator
    headerMode={'screen'}
    screenOptions={{
      animationTypeForReplace: 'push',
      header: (props) => {
        return <Header {...props} />;
      },
    }}
  >
    <Screen name="Home" component={Home} options={() => ({ title: 'Home' })} />
  </Navigator>
);

export default MainNavigator;
