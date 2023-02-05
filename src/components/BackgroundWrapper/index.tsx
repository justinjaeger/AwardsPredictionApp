import React from 'react';
import { ImageBackground } from 'react-native';
import { ReactChildren } from '../../types';

const BackgroundWrapper = (props: { children: ReactChildren }) => {
  return (
    <ImageBackground
      source={require('../../assets/background/awards-background.png')}
      resizeMode="cover"
      style={{ flex: 1, height: '100%', width: '100%', alignItems: 'center' }}
    >
      {props.children}
    </ImageBackground>
  );
};

export default BackgroundWrapper;
