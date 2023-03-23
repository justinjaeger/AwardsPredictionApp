import React from 'react';
import { TouchableHighlight, View } from 'react-native';
import theme from '../../constants/theme';
import useDevice from '../../util/device';
import CustomIcon from '../CustomIcon';

const CarouselArrow = ({
  direction,
  onPress,
}: {
  direction: 'back' | 'forward';
  onPress: () => void;
}) => {
  const { isPad } = useDevice();
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
        underlayColor={'rgba(0,0,0,0.5)'}
        onPress={onPress}
      >
        <View
          style={{
            backgroundColor: 'transparent',
            justifyContent: 'center',
            alignItems: direction === 'forward' ? 'flex-end' : 'flex-start',
            width: isPad ? 80 : 60,
          }}
        >
          <CustomIcon
            name={
              direction === 'forward'
                ? 'arrow-ios-forward-outline'
                : 'arrow-ios-back-outline'
            }
            size={isPad ? 60 : 30}
            color={undefined}
          />
        </View>
      </TouchableHighlight>
    </View>
  );
};

export default CarouselArrow;
