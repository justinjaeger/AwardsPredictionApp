import { StyleProp, ViewStyle } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import theme from '../../constants/theme';
import HeaderButton from './HeaderButton';

export const BACK_BUTTON_HEIGHT = 40;

const BackButton = ({
  onPress,
  variation,
  style,
}: {
  onPress?: () => void;
  variation?: 'transparent' | 'on-dark';
  style?: StyleProp<ViewStyle>;
}) => {
  const navigation = useNavigation();
  return (
    <HeaderButton
      onPress={() => {
        if (onPress) {
          onPress();
        } else {
          navigation.goBack();
        }
      }}
      icon="chevron-left-outline"
      variation={variation}
      style={style}
    />
  );
};

// we pass props here because this is used directly in navigation header
export const BackButtonForNavigator = () => (
  <BackButton
    style={{
      marginLeft: theme.windowMargin,
    }}
  />
);

export default BackButton;
