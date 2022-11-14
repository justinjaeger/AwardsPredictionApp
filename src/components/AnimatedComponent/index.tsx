import React from 'react';
import LottieView from 'lottie-react-native';

export interface ILottieAnimationProps {
  width?: number;
  height?: number;
  source: any;
  autoPlay?: boolean;
  loop?: boolean;
  animationRef?: React.MutableRefObject<LottieView | undefined>;
  speed?: number;
  style?: any;
  onAnimationFinish?: () => void;
}

export default function AnimatedComponent(props: ILottieAnimationProps) {
  return (
    <LottieView
      // @ts-ignore
      ref={props.animationRef}
      autoPlay={props.autoPlay || true}
      loop={props.loop || true}
      source={props.source}
      style={{ width: props.width, height: props.height, ...props.style }}
      speed={props.speed}
      onAnimationFinish={props.onAnimationFinish}
    />
  );
}
