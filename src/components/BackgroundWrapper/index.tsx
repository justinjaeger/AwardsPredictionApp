import React from 'react';
import { View, useWindowDimensions } from 'react-native';
import { ReactChildren } from '../../types';
import LinearGradient from 'react-native-linear-gradient';

const BackgroundWrapper = (props: { children: ReactChildren }) => {
  const { width, height } = useWindowDimensions();
  const spacingFactor = 10;
  const dotSpacing = width / spacingFactor;
  const dotSize = 6;
  return (
    <LinearGradient
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
      colors={['#212122', '#161716', '#101010']}
      style={{
        flex: 1,
      }}
    >
      <View
        style={{
          position: 'absolute',
          flexDirection: 'row',
          flexWrap: 'wrap',
          width: width + dotSpacing,
        }}
      >
        {Array.from({ length: (height / spacingFactor) * (height / width) }).map(() => (
          <View
            style={{
              width: dotSpacing + 1,
              height: dotSpacing,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <View
              style={{
                backgroundColor: 'rgba(255,255,255,0.02)',
                width: dotSize,
                height: dotSize,
                borderRadius: 10,
              }}
            />
          </View>
        ))}
      </View>
      <View
        style={{
          flex: 1,
          height: '100%',
          width: '100%',
          alignItems: 'center',
        }}
      >
        {props.children}
      </View>
    </LinearGradient>
  );
};

export default BackgroundWrapper;
