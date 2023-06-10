/* eslint-disable sonarjs/no-identical-functions */
import { useEffect, useRef, useState } from 'react';
import { Animated } from 'react-native';
import {
  iCategoryDisplayState,
  iEventDisplayState,
  useDisplayState,
} from '../../context/DisplayStateContext';

const TIMING = 300;

export const useCategoryDisplay = () => {
  const expandedOpacity = useRef(new Animated.Value(1)).current;
  const collapsedOpacity = useRef(new Animated.Value(0)).current;
  const gridOpacity = useRef(new Animated.Value(0)).current;

  const { categoryDisplayState } = useDisplayState();

  const [delayedDisplay, setDelayedDisplay] =
    useState<iCategoryDisplayState>(categoryDisplayState);

  const stateToAnimatedRef: { [key: string]: Animated.Value } = {
    list: expandedOpacity,
    'list-collapsed': collapsedOpacity,
    grid: gridOpacity,
  };

  const keys = Object.keys(stateToAnimatedRef);

  const turnOn = (state: iCategoryDisplayState) => {
    const ref = stateToAnimatedRef[state];
    setTimeout(() => {
      Animated.timing(ref, {
        toValue: 1,
        duration: TIMING,
        useNativeDriver: true,
      }).start();
      setDelayedDisplay(state);
    }, 0);
  };

  const turnOff = (state: iCategoryDisplayState) => {
    const ref = stateToAnimatedRef[state];
    Animated.timing(ref, {
      toValue: 0,
      duration: TIMING,
      useNativeDriver: true,
    }).start();
  };

  useEffect(() => {
    turnOn(categoryDisplayState);
    const remainingKeys = keys.filter(
      (key) => key !== categoryDisplayState,
    ) as iCategoryDisplayState[];
    remainingKeys.forEach((k) => {
      turnOff(k);
    });
  }, [categoryDisplayState]);

  return { delayedDisplay, expandedOpacity, gridOpacity, collapsedOpacity };
};

export const useEventDisplay = () => {
  const expandedOpacity = useRef(new Animated.Value(1)).current;
  const collapsedOpacity = useRef(new Animated.Value(0)).current;

  const { eventDisplayState } = useDisplayState();

  const [delayedDisplay, setDelayedDisplay] =
    useState<iEventDisplayState>(eventDisplayState);

  const stateToAnimatedRef: { [key: string]: Animated.Value } = {
    default: expandedOpacity,
    collapsed: collapsedOpacity,
  };

  const keys = Object.keys(stateToAnimatedRef);

  const turnOn = (state: iEventDisplayState) => {
    const ref = stateToAnimatedRef[state];
    setTimeout(() => {
      Animated.timing(ref, {
        toValue: 1,
        duration: TIMING,
        useNativeDriver: true,
      }).start();
      setDelayedDisplay(state);
    }, 0);
  };

  const turnOff = (state: iEventDisplayState) => {
    const ref = stateToAnimatedRef[state];
    Animated.timing(ref, {
      toValue: 0,
      duration: TIMING,
      useNativeDriver: true,
    }).start();
  };

  useEffect(() => {
    turnOn(eventDisplayState);
    const remainingKeys = keys.filter(
      (key) => key !== eventDisplayState,
    ) as iEventDisplayState[];
    remainingKeys.forEach((k) => {
      turnOff(k);
    });
  }, [eventDisplayState]);

  return { delayedDisplay, expandedOpacity, collapsedOpacity };
};
