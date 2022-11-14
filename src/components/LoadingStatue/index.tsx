import React from 'react';
import AnimatedComponent from '../AnimatedComponent';
import SpinningStatue from '../../assets/animation/loading_statue.json';

const LoadingStatue = (props: { size?: number }) => {
  const { size } = props;
  const _size = size || 200;
  return (
    <AnimatedComponent
      source={SpinningStatue}
      loop
      autoPlay
      width={_size}
      height={_size}
    />
  );
};

export default LoadingStatue;
