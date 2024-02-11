import { Keyboard, NativeScrollEvent, NativeSyntheticEvent } from 'react-native';

export const getLazyLoadProps = (onEndReached: () => void, isPad: boolean) => {
  return {
    onScroll: (e: NativeSyntheticEvent<NativeScrollEvent>) => {
      Keyboard.dismiss();
      // Fetches more at bottom of scroll. Note the high event throttle to prevent too many requests
      // get position of current scroll
      const currentOffset = e.nativeEvent.contentOffset.y;
      // get max bottom of scroll
      const maxOffset =
        e.nativeEvent.contentSize.height - e.nativeEvent.layoutMeasurement.height;
      // if we're close to the bottom fetch more
      if (currentOffset > maxOffset - 200) {
        onEndReached();
      }
    },
    scrollEventThrottle: 500,
    // triggers onEndReached at (X*100)% of list, for example 0.9 = 90% down}
    onEndReachedThreshold: isPad ? 0.8 : 0.5,
  };
};
