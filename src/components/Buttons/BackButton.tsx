import { useNavigation } from '@react-navigation/native';
import React from 'react';
import COLORS from '../../constants/colors';
import { IconButton } from './IconButton';

const BackButton = () => {
  const navigation = useNavigation();

  return (
    <IconButton
      iconProps={{
        name: 'arrow-ios-back-outline',
        styles: { color: COLORS.primary, width: 20, height: 30 },
      }}
      onPress={navigation.goBack}
      styles={{ width: 30, height: 30, marginLeft: 10 }}
    />
  );
};

export default BackButton;
