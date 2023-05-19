import { CommonActions } from '@react-navigation/native';

// if you don't stick these two screens in like this, you could get stuck not being able to go back
export const goToAccountSetup = CommonActions.reset({
  index: 1,
  routes: [
    { name: 'BottomTabNavigator', state: { routes: [{ name: 'Profile' }] } },
    {
      name: 'BottomTabNavigator',
      state: {
        routes: [{ name: 'Profile', params: { screen: 'UpdateProfileInfo' } }],
      },
    },
  ],
});
