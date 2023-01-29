import React from 'react';
import { TouchableHighlight, View } from 'react-native';
import COLORS from '../../constants/colors';
import theme from '../../constants/theme';
import CustomIcon from '../CustomIcon';

const CarouselArrow = ({
  direction,
  onPress,
  isDisabled,
}: {
  direction: 'back' | 'forward';
  onPress: () => void;
  isDisabled?: boolean;
}) => {
  return (
    <View
      style={{
        position: 'absolute',
        right: direction === 'forward' ? 0 : undefined,
        height: '100%',
        justifyContent: 'center',
        zIndex: 2,
      }}
    >
      <TouchableHighlight
        style={{
          height: '30%',
          backgroundColor: isDisabled ? 'transparent' : 'rgba(0,0,0,0.5)',
          borderRadius: theme.borderRadius,
          justifyContent: 'center',
          alignItems: 'center',
          //   width: 30,
        }}
        underlayColor={isDisabled ? 'transparent' : COLORS.secondary}
        onPress={isDisabled ? () => {} : onPress}
      >
        <CustomIcon
          name={
            direction === 'forward'
              ? 'arrow-ios-forward-outline'
              : 'arrow-ios-back-outline'
          }
          color={isDisabled ? 'transparent' : undefined}
        />
      </TouchableHighlight>
    </View>
  );
};

export default CarouselArrow;
