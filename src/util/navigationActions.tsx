import { CommonActions } from '@react-navigation/native';

// if you don't stick these two screens in like this, you could get stuck not being able to go back
export const resetToProfile = CommonActions.reset({
  index: 0,
  routes: [{ name: 'BottomTabNavigator', state: { routes: [{ name: 'ProfileTab' }] } }],
});
