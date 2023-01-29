import React from 'react';
import { TouchableHighlight, View } from 'react-native';
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
          position: 'absolute',
          right: direction === 'forward' ? 0 : undefined,
          height: '50%',
          justifyContent: 'center',
          borderRadius: theme.borderRadius,
        }}
        underlayColor={isDisabled ? 'transparent' : 'rgba(0,0,0,0.5)'}
        onPress={isDisabled ? () => {} : onPress}
      >
        <View
          style={{
            backgroundColor: 'transparent',
            justifyContent: 'center',
            alignItems: 'center',
            width: 30,
          }}
        >
          <CustomIcon
            name={
              direction === 'forward'
                ? 'arrow-ios-forward-outline'
                : 'arrow-ios-back-outline'
            }
            color={isDisabled ? 'transparent' : undefined}
          />
        </View>
      </TouchableHighlight>
    </View>
  );
};

export default CarouselArrow;
