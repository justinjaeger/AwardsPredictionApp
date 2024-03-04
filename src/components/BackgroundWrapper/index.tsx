import React from 'react';
import { View, useWindowDimensions } from 'react-native';
import { ReactChildren } from '../../types/keys';
import LinearGradient from 'react-native-linear-gradient';
import COLORS from '../../constants/colors';

const BackgroundWrapper = (props: { children: ReactChildren }) => {
  const { width } = useWindowDimensions();
  const spacingFactor = 10;
  const dotSpacing = width / spacingFactor;
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
      />
      <View
        style={{
          flex: 1,
          height: '100%',
          width: '100%',
          alignItems: 'center',
          backgroundColor: COLORS.primaryDark,
        }}
      >
        {props.children}
      </View>
    </LinearGradient>
  );
};

export default BackgroundWrapper;
