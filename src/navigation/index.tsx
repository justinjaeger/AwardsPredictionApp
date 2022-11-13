import 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react';
// import RNBootSplash from 'react-native-bootsplash'; // splash screen (https://github.com/zoontek/react-native-bootsplash)
import { NavigationContainer } from '@react-navigation/native';
import MainNavigator from './MainNavigator';
import { useAppDispatch } from '../store';
import { thunkGetAllEvents } from '../store/thunks/getAllEventsAndCategories';
import { View } from 'react-native';

// onReady={() => RNBootSplash.hide()} (could add to NavigationContainer)
const Navigation = () => {
  //   const [loading, setLoading] = useState<boolean>(true);

  //   const dispatch = useAppDispatch();

  //   useEffect(() => {
  //     dispatch(thunkGetAllEvents())
  //       .then((res) => {
  //         console.error('res', res);
  //       })
  //       .catch((err) => {
  //         console.error('err', err);
  //       });
  //   }, []);

  return (
    <NavigationContainer>
      <MainNavigator />
    </NavigationContainer>
  );
};

export default Navigation;
