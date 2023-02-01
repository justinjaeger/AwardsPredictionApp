import React from 'react';
import { TouchableHighlight, View } from 'react-native';
import theme from '../../constants/theme';
import CustomIcon from '../CustomIcon';

const CarouselArrow = ({
  direction,
  onPress,
}: //   isDisabled,
{
  direction: 'back' | 'forward';
  onPress: () => void;
  isDisabled?: boolean;
}) => {
  const isDisabled = false; // don't let it be disabled
  return (
    <View
      style={{
        position: 'absolute',
        right: direction === 'forward' ? 0 : undefined,
        height: '120%', // weird but centers it
        justifyContent: 'center',
        zIndex: 2,
      }}
    >
      <TouchableHighlight
        style={{
          position: 'absolute',
          right: direction === 'forward' ? 0 : undefined,
          height: '80%',
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
            alignItems: direction === 'forward' ? 'flex-end' : 'flex-start',
            width: 60,
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
