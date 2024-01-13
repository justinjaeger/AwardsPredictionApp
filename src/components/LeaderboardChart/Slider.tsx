import React from 'react';
import { StyleProp, View, ViewStyle } from 'react-native';
import { useSharedValue } from 'react-native-reanimated';
import COLORS from '../../constants/colors';
import { Slider as AwesomeSlider } from 'react-native-awesome-slider';

const THUMB_SIZE = 24;

const Slider = ({
  onValueChange,
  onSlidingComplete,
  style,
}: {
  onValueChange: (v: number) => void;
  onSlidingComplete: (v: number) => void;
  style?: StyleProp<ViewStyle>;
}) => {
  const sliderMin = useSharedValue(0);
  const sliderMax = useSharedValue(100);
  const sliderProgress = useSharedValue(0);

  return (
    <AwesomeSlider
      style={[
        {
          width: '90%',
          alignSelf: 'center',
          margin: 10,
          borderRadius: 10,
          paddingLeft: 10,
          paddingRight: 10,
        },
        style,
      ]}
      onValueChange={onValueChange}
      onSlidingComplete={onSlidingComplete}
      progress={sliderProgress}
      minimumValue={sliderMin}
      maximumValue={sliderMax}
      renderBubble={() => null}
      containerStyle={{
        borderRadius: 10,
      }}
      renderThumb={() => (
        <View
          style={{
            width: THUMB_SIZE,
            height: THUMB_SIZE,
            borderRadius: THUMB_SIZE,
            backgroundColor: COLORS.secondaryDark,
          }}
        />
      )}
      theme={{
        disableMinTrackTintColor: 'red',
        maximumTrackTintColor: COLORS.secondaryLight,
        minimumTrackTintColor: COLORS.secondaryDark,
        cacheTrackTintColor: 'red',
        bubbleBackgroundColor: COLORS.primary,
        bubbleTextColor: COLORS.white,
      }}
    />
  );
};

export default Slider;
