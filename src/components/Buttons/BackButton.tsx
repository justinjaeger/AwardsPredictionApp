import { useNavigation } from '@react-navigation/native';
import React from 'react';
import theme from '../../theme';
import { IconButton } from '../IconButton';

const BackButton = () => {
  const { goBack } = useNavigation();

  return (
    <IconButton
      iconProps={{
        name: 'arrow-ios-back-outline',
        styles: { color: theme['colors-primary-900'], width: 20, height: 30 },
      }}
      onPress={goBack}
      styles={{ width: 30, height: 30, marginLeft: 10 }}
    />
  );
};

export default BackButton;
