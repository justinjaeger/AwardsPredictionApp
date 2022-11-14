import React from 'react';
import { ImageBackground } from 'react-native';

const BackgroundWrapper = (props: { children: React.ReactChild }) => {
  return (
    <ImageBackground
      source={require('../../assets/background/awards-background.png')}
      resizeMode="cover"
      style={{ flex: 1 }}
    >
      {props.children}
    </ImageBackground>
  );
};

export default BackgroundWrapper;
