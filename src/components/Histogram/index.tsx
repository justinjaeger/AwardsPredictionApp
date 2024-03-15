import React, { useEffect, useState } from 'react';
import { PosterSize, getPosterDimensionsByWidth } from '../../constants/posterDimensions';
import {
  FlatList,
  GestureResponderEvent,
  ScrollView,
  View,
  useWindowDimensions,
} from 'react-native';
import COLORS from '../../constants/colors';
import { hexToRgb } from '../../util/hexToRgb';
import { Body, Header, SubHeader, SubHeaderLight } from '../Text';
import theme from '../../constants/theme';
import { formatPercentage } from '../../util/formatPercentage';
import useDevice from '../../util/device';
import { triggerHaptic } from '../../util/hapticFeedback';

export const SLOTS_TO_DISPLAY_EXTRA = 5;

const Histogram = ({
  numPredicting,
  totalNumPredicting,
  totalNumPredictingTop,
  totalNumPredictingCategory,
  slots = 5,
  totalWidth: _totalWidth,
  posterHeight: _posterHeight,
  enableHoverInfo,
  containerWidthFactor,
  displayNoExtraSlots,
  flatListRef,
  scrollRef,
  isList,
}: {
  numPredicting: Record<number, number>;
  totalNumPredicting: number;
  totalNumPredictingTop: number;
  totalNumPredictingCategory?: number; // only necessary if hover info is enabled
  slots?: number;
  totalWidth?: number;
  posterHeight?: number;
  enableHoverInfo?: boolean;
  containerWidthFactor?: number;
  displayNoExtraSlots?: boolean;
  // important props for enabling/disabling scroll when inside a scrollview:
  flatListRef?: React.RefObject<FlatList<any>>;
  scrollRef?: React.RefObject<ScrollView>;
  isList?: boolean;
}) => {
  const { isPad } = useDevice();
  const { width: windowWidth } = useWindowDimensions();
  const { height: pHeight } = getPosterDimensionsByWidth(
    isPad ? PosterSize.MEDIUM : PosterSize.SMALL,
  );
  const posterHeight = _posterHeight ?? pHeight;
  const totalWidth = ((_totalWidth ?? windowWidth) - 20) * (containerWidthFactor ?? 1);
  const marginIfCenter = (windowWidth - totalWidth) / 2;

  const barsToShow = slots + (displayNoExtraSlots ? 0 : SLOTS_TO_DISPLAY_EXTRA);
  const barMaxHeight = posterHeight * 1;

  const [gesturePos, setGesturePos] = useState<{ x: number; y: number } | undefined>(
    undefined,
  );

  const handleGesture = (e: GestureResponderEvent) => {
    e.preventDefault();
    if (!enableHoverInfo) return;
    const x = e.nativeEvent.pageX - marginIfCenter + 5;
    const y = e.nativeEvent.pageY;
    const touchIsAboveHistogram = y <= 0;
    setGesturePos(touchIsAboveHistogram ? undefined : { x, y });
  };

  const widthOfEachBar = totalWidth / barsToShow;

  let slotThatTouchIsIn =
    gesturePos && Math.floor((gesturePos.x / totalWidth) * barsToShow) + 1;

  // adjust for margins:
  slotThatTouchIsIn =
    slotThatTouchIsIn !== undefined
      ? slotThatTouchIsIn > barsToShow
        ? barsToShow
        : Math.max(slotThatTouchIsIn, 1)
      : undefined;

  const numPredictingInSelectedSlot =
    (slotThatTouchIsIn && numPredicting?.[slotThatTouchIsIn]) || 0;

  useEffect(() => {
    if (slotThatTouchIsIn !== undefined) {
      triggerHaptic();
    }
  }, [slotThatTouchIsIn]);

  // lets us set the props of the scrollview from outside the component
  // better for performance since it won't re-render the component
  const enableScroll = (scrollEnabled: boolean) => {
    flatListRef?.current?.setNativeProps?.({ scrollEnabled });
    scrollRef?.current?.setNativeProps?.({ scrollEnabled });
  };

  return (
    <View
      style={{
        flexDirection: 'row',
        alignSelf: 'flex-end',
        alignItems: 'flex-end',
        justifyContent: 'space-between',
        height: barMaxHeight,
        width: totalWidth,
        zIndex: 1,
        borderBottomWidth: 1,
        borderBottomColor: hexToRgb(COLORS.secondary, 0.1),
        marginRight: 10,
        marginLeft: 10,
        borderRadius: theme.borderRadius,
        backgroundColor: enableHoverInfo ? hexToRgb(COLORS.gray, 0.05) : undefined,
      }}
      pointerEvents={enableHoverInfo ? 'auto' : 'none'}
      onStartShouldSetResponder={() => true}
      onMoveShouldSetResponder={() => true}
      onResponderGrant={(e) => {
        handleGesture(e);
        enableScroll(false);
      }}
      onResponderMove={(e) => {
        handleGesture(e);
      }}
      onTouchEnd={() => {
        setGesturePos(undefined);
        enableScroll(true);
      }}
    >
      {new Array(barsToShow).fill(null).map((x, i) => {
        const place = i + 1;
        const isHighlighted = place === slotThatTouchIsIn;

        const numPredictingPlace = numPredicting?.[place] || 0;
        const h =
          barMaxHeight *
          ((numPredictingPlace || 1) / (totalNumPredicting || 1)) *
          (totalNumPredictingTop ? totalNumPredicting / totalNumPredictingTop : 1);
        const w = totalWidth / barsToShow - 5;
        return (
          <View
            key={i}
            style={{
              backgroundColor: isHighlighted
                ? hexToRgb(COLORS.secondaryLight, 0.3)
                : undefined,
              height: '100%',
              justifyContent: 'flex-end',
            }}
            pointerEvents="none"
          >
            <View
              style={{
                width: widthOfEachBar - 5,
                height: numPredictingPlace > 0 ? h : 0,
                backgroundColor:
                  place <= slots ? COLORS.secondaryLight : COLORS.secondaryMiddle,
                zIndex: 100,
              }}
              pointerEvents="none"
            />
            {gesturePos !== undefined ? (
              <Body
                style={{
                  position: 'absolute',
                  right: w / 4,
                  bottom: -20,
                }}
              >
                {place.toString()}
              </Body>
            ) : null}
          </View>
        );
      })}
      {gesturePos !== undefined ? (
        <View
          style={{
            position: 'absolute',
            right: 0,
            top: -barMaxHeight - (isPad ? 0 : 40),
            backgroundColor: COLORS.primary,
            borderRadius: theme.borderRadius,
            alignItems: 'flex-end',
            flexDirection: 'column',
            borderWidth: 1,
            borderColor: hexToRgb(COLORS.white, 0.2),
          }}
        >
          <View style={{ padding: 5 }}>
            <View style={{ flexDirection: 'row', alignItems: 'baseline', minWidth: 100 }}>
              <Header>{numPredictingInSelectedSlot.toString()}</Header>
              <SubHeaderLight style={{ marginLeft: 5 }}>
                {isList ? 'users' : 'predicting'}
              </SubHeaderLight>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: 5,
              }}
            >
              <SubHeaderLight>{'#' + slotThatTouchIsIn?.toString() ?? ''}</SubHeaderLight>
              {totalNumPredictingCategory ? (
                <SubHeader>
                  {formatPercentage(
                    numPredictingInSelectedSlot / totalNumPredictingCategory,
                  )}
                </SubHeader>
              ) : null}
            </View>
          </View>
        </View>
      ) : null}
    </View>
  );
};

export default Histogram;
