import { useNavigation } from '@react-navigation/native';
import React from 'react';
import theme from '../../constants/theme';
import { IconButton } from './IconButton';

const BackButton = (props: { onPress?: () => void }) => {
  const { onPress } = props;
  const navigation = useNavigation();

  return (
    <IconButton
      iconProps={{ name: 'arrow-ios-back-outline' }}
      onPress={() => {
        if (onPress) {
          onPress();
        } else {
          navigation.goBack();
        }
      }}
      styles={{ marginLeft: theme.windowMargin }}
    />
  );
};

export default BackButton;
