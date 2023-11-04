import React from 'react';
import { StyleProp, TouchableHighlight, View, ViewStyle } from 'react-native';
import COLORS from '../../constants/colors';
import useDevice from '../../util/device';
import CustomIcon from '../CustomIcon';
import { SubHeader } from '../Text';
import { Spinner } from '@ui-kitten/components';

const ActionButton = ({
  onPress,
  iconName,
  text,
  style,
  underlayColor,
  isLoading,
}: {
  onPress: () => void;
  iconName?: string | undefined;
  text?: string | undefined;
  style?: StyleProp<ViewStyle>;
  underlayColor?: string;
  isLoading?: boolean;
}) => {
  const { isPad } = useDevice();

  return (
    <TouchableHighlight
      style={[
        {
          backgroundColor: COLORS.secondaryDark,
          borderColor: COLORS.white,
          borderWidth: 1,
          borderRadius: 100,
          alignItems: 'center',
          padding: 15 * (isPad ? 2 : 1),
          margin: 10,
        },
        style,
      ]}
      onPress={onPress}
      underlayColor={underlayColor ?? COLORS.secondaryDark}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        {isLoading ? (
          <Spinner size="medium" style={{ borderColor: COLORS.white }} />
        ) : iconName ? (
          <CustomIcon name={iconName} color={COLORS.white} size={24} />
        ) : null}
        {text ? (
          <SubHeader style={{ marginLeft: 5, marginRight: 5 }}>{text}</SubHeader>
        ) : null}
      </View>
    </TouchableHighlight>
  );
};

export default ActionButton;
