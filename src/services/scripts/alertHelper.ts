import { Alert } from 'react-native';

const alertHelper = async (warning: string, onPress: () => void) => {
  Alert.alert(warning, '', [
    {
      text: 'Cancel',
      onPress: () => {
        console.log('Cancel Pressed');
        throw new Error('Cancelled');
      },
    },
    {
      text: 'DELETE',
      onPress,
    },
  ]);
};

export default alertHelper;
