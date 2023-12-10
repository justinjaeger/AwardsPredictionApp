import { useNavigation } from '@react-navigation/native';
import React from 'react';
import theme from '../../constants/theme';
import { IconButton } from './IconButton';

type iBackButtonProps = {
  onPress?: () => void;
  iconName?: string;
};

const BackButtonBase = ({ onPress, iconName }: iBackButtonProps) => {
  const navigation = useNavigation();

  return (
    <IconButton
      iconProps={{ name: iconName || 'arrow-ios-back-outline' }}
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

const BackButton = (props: iBackButtonProps) => <BackButtonBase {...props} />;

export const DownButton = (props: iBackButtonProps) => (
  <BackButtonBase {...props} iconName={'arrow-ios-downward-outline'} />
);

export default BackButton;
